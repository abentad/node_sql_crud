const express = require('express');
const app = express();
const mysql = require('mysql');

//mysql connection
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shopri',
    multipleStatements: true
});

mysqlConnection.connect((error)=>{
    if(error) console.log(error);
    else console.log('DB connected!');
});


//middle wares
app.use(express.json());


//routes
//add new product
app.post('/products',(req,res)=>{
    const { name, price, description, category, datePosted, posterId, posterName, posterProfileAvatar, posterPhoneNumber} = req.body;
    mysqlConnection.query("INSERT INTO products(name, price, description, category, datePosted, posterId, posterName, posterProfileAvatar, posterPhoneNumber)\
     VALUES ('"+ name +"','"+price+"','" +description+"','"+category+"','"+datePosted+"','"+posterId+"','"+posterName+"','"+posterProfileAvatar+"','"+posterPhoneNumber+"')"
     ,(error, rows, fields)=>{
        if(error) console.log(error);
        else res.json('Added successfully');
    });
});

//get all products
app.get('/products',(req,res)=>{
    mysqlConnection.query("SELECT * FROM products",(error, rows, fields)=>{
        if(error) console.log(error);
        else res.json(rows);
    });
});

//get specific product by its id
app.get('/product',(req,res)=>{
    const { id } = req.query;
    mysqlConnection.query('SELECT * FROM products WHERE id = ?', [id], (error, rows, fields)=>{
        if(error) console.log(error);
        else res.json(rows);
    });
});

//update product
app.put('/products',(req,res)=>{
    const { id, name, price, description, category, datePosted, posterId, posterName, posterProfileAvatar, posterPhoneNumber} = req.body;
    mysqlConnection.query("UPDATE products SET name='"+ name +"',price='"+ price +"',description='"+ description +"',category='"+ category +"',datePosted='"+ datePosted +"'\
    ,posterId='"+ posterId +"',posterName='"+ posterName +"',posterProfileAvatar='"+ posterProfileAvatar +"',posterPhoneNumber='"+ posterPhoneNumber +"' WHERE id = ?",[id]
     ,(error, rows, fields)=>{
        if(error) console.log(error);
        else res.json('Updated successfully');
    });
});

//delete product by its id
app.delete('/product',(req,res)=>{
    //TODO: Remeber to remove the product image file from file system when you host the api to server
    const { id } = req.query;
    mysqlConnection.query('DELETE FROM products WHERE id = ?', [id], (error, rows, fields)=>{
        if(error) console.log(error);
        else res.json({message: 'Deleted Successfully'});
    });
});






//server start
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('server started at http://localhost:${port}'));


// "INSERT INTO 'products'('name', 'price', 'description', 'category', 'datePosted', 'posterId', 'posterName', 'posterProfileAvatar', 'posterPhoneNumber') VALUES ('${name}','${price}','${description}','${category}','${datePosted}','${posterId}','${posterName}','${posterProfileAvatar}','${posterPhoneNumber}')"