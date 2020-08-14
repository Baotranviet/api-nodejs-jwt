const db = require("../models");
const Book = db.book;

let {bookValidator} = require("../validators/book.validator");

exports.create = async (req,res) => {
    try {
        let validator = await bookValidator(req);
        if (validator !== null) {
            return res.send({message: validator});
        }

        var book = {
            bookCode: req.body.bookCode,
            bookName: req.body.bookName,
            pageNumber: req.body.pageNumber,
            quantity: req.body.quantity,
            authorId: req.body.authorId
        };

        Book.create(book)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            }); 
    } catch (error) {
        return res.status(500).send({
            error: error
        });
    } 
};

exports.findAll = (req,res) => {
    Book.findAll()
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message : err.message
            });
        });
};

exports.findOne = (req,res) => {
    var bookCode = req.params.bookCode;
    bookCode = bookCode.toString();
    
    Book.findByPk(bookCode, { include: ["authors"]})
        .then((data) => {
            if (data == null) {
                res.send("Not found");
            }
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.update = async (req,res) => {
    try {
        let validator = await bookValidator(req);
        if (validator !== null) {
            return res.send({message: validator});
        }

        var bookCode = req.params.bookCode;
        bookCode = bookCode.toString();

        Book.update(req.body, {
            where: { bookCode: bookCode }
        })
            .then((num) => {
                if (num == 1) {
                    res.send({
                        message: "Book updated successfully"
                    });
                } else {
                    res.send({
                        message: `Cannot update Book with bookCode=${bookCode}`
                    });
                }
            }).catch((err) => {
                res.status(500).send({
                    message: err.message
                });
            });
    } catch (error) {
        return res.status(500).send({
            error: error
        });
    } 
};

exports.delete = (req,res) => {
    var bookCode = req.params.bookCode;
    bookCode = bookCode.toString();

    Book.destroy({
        where: { bookCode: bookCode }
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Book deleted successfully"
                });
            } else {
                res.send({
                    message: `Cannot delete Book with bookCode=${bookCode}`
                });
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message
            });
        });
}

exports.deleteAll = (req,res) => {
    Book.destroy({
        where: {},
        truncate: false
    })
        .then((nums) => {
            res.send({
                message: `${nums} Book deleted successfully`
            });
        }).catch((err) => {
            res.status(500).send({
                message: err.message
            })
        });
}
