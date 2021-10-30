const router = require('express').Router();
const mysqlConnection = require('../utils/database');

//
//add new user
router.post('/',(req,res)=>{
    const { username, email, phoneNumber, password, profile_image, dateJoined} = req.body;
    mysqlConnection.query("INSERT INTO users(username, email, phoneNumber, password, profile_image, dateJoined)\
     VALUES ('"+ username +"','"+email+"','" +phoneNumber+"','"+password+"','"+profile_image+"','"+dateJoined+"')"
     ,(error, rows, fields)=>{
        if(error) console.log(error);
        else res.json('Added successfully');
    });
});

//get all users
router.get('/',(req,res)=>{
    mysqlConnection.query("SELECT * FROM users",(error, rows, fields)=>{
        if(error) console.log(error);
        else res.json(rows);
    });
});

//get specific user by their id
router.get('/',(req,res)=>{
    const { id } = req.query;
    mysqlConnection.query('SELECT * FROM users WHERE id = ?', [id], (error, rows, fields)=>{
        if(error) console.log(error);
        else res.json(rows);
    });
});

//update user
router.put('/',(req,res)=>{
    const { id, username, email, phoneNumber, password, profile_image, dateJoined} = req.body;
    mysqlConnection.query("UPDATE users SET username='"+ username +"',email='"+ email +"',phoneNumber='"+ phoneNumber +"',password='"+ password +"',profile_image='"+ profile_image +"'\
    ,dateJoined='"+ dateJoined +"' WHERE id = ?",[id]
     ,(error, rows, fields)=>{
        if(error) console.log(error);
        else res.json('Updated successfully');
    });
});

//delete user by their id
router.delete('/',(req,res)=>{
    //TODO: Remeber to remove the user profile image file from file system when you host the api to server
    const { id } = req.query;
    mysqlConnection.query('DELETE FROM users WHERE id = ?', [id], (error, rows, fields)=>{
        if(error) console.log(error);
        else res.json({message: 'Deleted Successfully'});
    });
});


module.exports = router;
