const avatarConfig = require('../config/avatar.config.js');
const avatarController = require('../controllers/avatar.controller.js');
const { authJwt } = require("../middleware");

module.exports = function (app) {
    app.use( function (req,res,next) {  
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });
    
    app.post('/api/uploadAvatar',
        [authJwt.verifyToken],
        avatarConfig.single("uploadAvatar"),
        avatarController.upload
    )
}