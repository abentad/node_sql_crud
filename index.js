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
app.post('/product',(req,res)=>{
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
app.put('/product',(req,res)=>{
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




//
//
//
//
//
//
//add new user
app.post('/user',(req,res)=>{
    const { username, email, phoneNumber, password, profile_image, dateJoined} = req.body;
    mysqlConnection.query("INSERT INTO users(username, email, phoneNumber, password, profile_image, dateJoined)\
     VALUES ('"+ username +"','"+email+"','" +phoneNumber+"','"+password+"','"+profile_image+"','"+dateJoined+"')"
     ,(error, rows, fields)=>{
        if(error) console.log(error);
        else res.json('Added successfully');
    });
});

//get all users
app.get('/users',(req,res)=>{
    mysqlConnection.query("SELECT * FROM users",(error, rows, fields)=>{
        if(error) console.log(error);
        else res.json(rows);
    });
});

//get specific user by their id
app.get('/user',(req,res)=>{
    const { id } = req.query;
    mysqlConnection.query('SELECT * FROM users WHERE id = ?', [id], (error, rows, fields)=>{
        if(error) console.log(error);
        else res.json(rows);
    });
});

//update user
app.put('/user',(req,res)=>{
    const { id, username, email, phoneNumber, password, profile_image, dateJoined} = req.body;
    mysqlConnection.query("UPDATE users SET username='"+ username +"',email='"+ email +"',phoneNumber='"+ phoneNumber +"',password='"+ password +"',profile_image='"+ profile_image +"'\
    ,dateJoined='"+ dateJoined +"' WHERE id = ?",[id]
     ,(error, rows, fields)=>{
        if(error) console.log(error);
        else res.json('Updated successfully');
    });
});

//delete user by their id
app.delete('/user',(req,res)=>{
    //TODO: Remeber to remove the user profile image file from file system when you host the api to server
    const { id } = req.query;
    mysqlConnection.query('DELETE FROM users WHERE id = ?', [id], (error, rows, fields)=>{
        if(error) console.log(error);
        else res.json({message: 'Deleted Successfully'});
    });
});






//server start
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('server started at http://localhost:${port}'));


// "INSERT INTO 'products'('name', 'price', 'description', 'category', 'datePosted', 'posterId', 'posterName', 'posterProfileAvatar', 'posterPhoneNumber') VALUES ('${name}','${price}','${description}','${category}','${datePosted}','${posterId}','${posterName}','${posterProfileAvatar}','${posterPhoneNumber}')"