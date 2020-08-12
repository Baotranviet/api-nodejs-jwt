const fs = require('fs');
const db = require("../models");
const Avatar = db.avatar;

exports.upload = (req,res) => {
    Avatar.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        data: fs.readFileSync(__basedir + '/uploads/' + req.file.filename)
    }).then(avatar => {
        try {
            fs.readFileSync(__basedir + '/uploads/' + avatar.name, avatar.data);
            
            res.json({'msg': 'File uploaded successfully!', 'file': req.file});
        } catch (error) {
            console.log(error);
            res.json({'error': error});
        }
    })
}