const authors = require("../controllers/author.controller.js");
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

    router.post("/", [authJwt.verifyToken], authors.create);

    router.get("/", authors.findAll);

    router.get("/:id", authors.findOne);

    router.put("/:id", [authJwt.verifyToken], authors.update);

    router.delete("/:id", [authJwt.verifyToken], authors.delete);

    router.delete("/", authors.deleteAll);

    app.use('/api/authors', router);
} 