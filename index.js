const express = require('express');
const app = express();
const productRoute = require('./routes/product');
const usersRoute = require('./routes/user');
const imagesRoute = require('./routes/image');




//middle wares
app.use(express.json());
app.use('/products', productRoute);
app.use('/users', usersRoute);
app.use('/images', imagesRoute);

//server start
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('server started at http://localhost:${port}'));

