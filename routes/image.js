const router = require('express').Router();
const mysqlConnection = require('../utils/database');

//
//post product image to a product by its product id
router.post('/',(req,res)=>{
    const images = [];
    try {
        JSON.parse(JSON.stringify(req.body)).forEach((image)=> images.push(image));
    } catch (error) {
        console.log(`cannot parse because: ${error.message}`);
    }
    console.log(`found ${images.length} images`);
    console.log(images.map(image=>`${image.id},${image.url}`));
    mysqlConnection.query("INSERT INTO images (id, url) VALUES ?", [images.map(image => [image.id, image.url])] , (err) => {
        if (err) throw err;
        else res.json({message: `Added ${images.length} images successfully`});
        // conn.end();
    });
});

//get product images by product id
router.get('/',(req,res)=>{
    const { id } = req.query;
    mysqlConnection.query('SELECT * FROM images WHERE id = ?', [id], (error, rows, fields)=>{
        if(error) console.log(error);
        else res.json(rows);
    });
});

//delete product images by product id
router.delete('/',(req,res)=>{
    //TODO: Remeber to remove the product image file from file system when you host the api to server
    const { id } = req.query;
    mysqlConnection.query('DELETE FROM images WHERE image_id = ?', [id], (error, rows, fields)=>{
        if(error) console.log(error);
        else res.json({message: 'Deleted Successfully'});
    });
});

module.exports = router;