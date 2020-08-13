const borrowers = require("../controllers/borrower.controller.js");
const { authJwt } = require("../middleware");

var router = require("express").Router();

module.exports = (app) => {
    app.use( function (req,res,next) {  
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    })

    router.post("/", [authJwt.verifyToken], borrowers.create);

    router.get("/", borrowers.findAll);

    router.get("/:cardNumber", borrowers.findOne);

    router.put("/:cardNumber", [authJwt.verifyToken], borrowers.update);

    router.delete("/:cardNumber", [authJwt.verifyToken], borrowers.delete);

    router.delete("/", borrowers.deleteAll);

    app.use('/api/borrowers', router);
} 