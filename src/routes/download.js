const express = require("express");
const router = express.Router();
const db = require('../models');
const Image = db.images;

router.post("/download", (req, res) => {
    console.log('req.body: ', req.body.name)

    Image.findOne({where: { name: req.body.name }}).then((image) => {
        console.log('image:', image.dataValues.data);
        const buffer = new Buffer.from(image.dataValues.data);
        const bufferUTF8 = buffer.toString('utf-8')
        return bufferUTF8
    }).then((bufferUTF8) => {
        res.send(bufferUTF8)
    })
   
});

module.exports = router