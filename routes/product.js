const router = require('express').Router();
const mysqlConnection = require('../utils/database');

//add new product
//TODO: dont forget to port list of images row to this table
router.post('/',(req,res)=>{
    const { name, price, description, category, image, datePosted, posterId, posterName, posterProfileAvatar, posterPhoneNumber} = req.body;
    mysqlConnection.query("INSERT INTO products(name, price, description, category, image, datePosted, posterId, posterName, posterProfileAvatar, posterPhoneNumber)\
     VALUES ('"+ name +"','"+price+"','" +description+"','"+category+"','"+image+"','"+datePosted+"','"+posterId+"','"+posterName+"','"+posterProfileAvatar+"','"+posterPhoneNumber+"')"
     ,(error, rows, fields)=>{
        if(error) console.log(error);
        else res.json('Added successfully');
    });
});

//get all products
//TODO: paginate
router.get('/',(req,res)=>{
    const { size } = req.query;
    const page = req.query.page ? Number(req.query.page) : 1;
    mysqlConnection.query("SELECT * FROM products",(error, rows, fields)=>{
        const resLength = rows.length;
        const totalPages = Math.ceil(resLength / size);        
        if(error) console.log(error);
        if(page > totalPages) res.redirect('/products?page='+ encodeURIComponent(totalPages) + '&size='+ encodeURIComponent(size));
        else if(page < 1)  res.redirect('/products?page='+ encodeURIComponent('1') + '&size='+ encodeURIComponent(size));
        const startPoint = (page - 1) * size;
        mysqlConnection.query(`SELECT * FROM products ORDER BY id DESC LIMIT ${startPoint},${size}`,(error, rows, fields)=>{
            if(error) console.log(error);
            let iterator = (page - 5) < 1 ? 1 : page - 5;
            let endPoint = (iterator + 9) <= totalPages ? (iterator + 9) : page + (totalPages - page);
            if(endPoint < (page + 4)){
                iterator -= (page + 4) - totalPages;
            }
            res.json(rows);
        });
    });
});

//get specific product by its id
router.get('/',(req,res)=>{
    const { id } = req.query;
    mysqlConnection.query('SELECT * FROM products WHERE id = ?', [id], (error, rows, fields)=>{
        if(error) console.log(error);
        else res.json(rows);
    });
});

//update product
router.put('/',(req,res)=>{
    const { id, name, price, description, category, image, datePosted, posterId, posterName, posterProfileAvatar, posterPhoneNumber} = req.body;
    mysqlConnection.query("UPDATE products SET name='"+ name +"',price='"+ price +"',description='"+ description +"',category='"+ category +"',image='"+ image +"',datePosted='"+ datePosted +"'\
    ,posterId='"+ posterId +"',posterName='"+ posterName +"',posterProfileAvatar='"+ posterProfileAvatar +"',posterPhoneNumber='"+ posterPhoneNumber +"' WHERE id = ?",[id]
     ,(error, rows, fields)=>{
        if(error) console.log(error);
        else res.json('Updated successfully');
    });
});

//delete product by its id
router.delete('/',(req,res)=>{
    //TODO: Remeber to remove the product image file from file system when you host the api to server
    const { id } = req.query;
    mysqlConnection.query('DELETE FROM products WHERE id = ?', [id], (error, rows, fields)=>{
        if(error) console.log(error);
        else res.json({message: 'Deleted Successfully'});
    });
});




module.exports = router;