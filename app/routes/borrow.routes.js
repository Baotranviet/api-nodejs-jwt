const borrows = require("../controllers/borrow.controller.js");
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

    router.post("/", [authJwt.verifyToken], borrows.create);

    router.get("/", borrows.findAll);

    router.get("/:id", borrows.findOne);

    router.put("/:id", [authJwt.verifyToken], borrows.update);

    router.delete("/:id", [authJwt.verifyToken], borrows.delete);

    router.delete("/", borrows.deleteAll);

    app.use('/api/borrows', router);
} 