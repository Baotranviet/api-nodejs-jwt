const books = require("../controllers/book.controller.js");
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

    router.post("/", [authJwt.verifyToken], books.create);

    router.get("/", books.findAll);

    router.get("/:bookCode", books.findOne);

    router.put("/:bookCode", [authJwt.verifyToken], books.update);

    router.delete("/:bookCode", [authJwt.verifyToken], books.delete);

    router.delete("/", books.deleteAll);

    app.use('/api/books', router);
} 