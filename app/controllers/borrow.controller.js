const db = require("../models");
const Borrow = db.borrow;

exports.create = async (req,res) => {
    if (!req.body.borrowDate ||
        !req.body.payDate ||
        !req.body.bookCode ||
        !req.body.cardNumber) {
        res.status(400).send({
            message: "Value is required"
        });
        return ;
    }

    const borrow = {
        borrowDate: req.body.borrowDate,
        payDate: req.body.payDate,
        bookCode: req.body.bookCode,
        cardNumber: req.body.cardNumber
    };

    Borrow.create(borrow)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });  
};

exports.findAll = (req,res) => {
    Borrow.findAll()
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message : err.message
            });
        });
};

exports.findOne = (req,res) => {
    const id = req.params.id;

    Borrow.findByPk(id)
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

exports.update = (req,res) => {
    const id = req.params.id;

    Borrow.update(req.body, {
        where: { id: id }
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Borrow updated successfully"
                });
            } else {
                res.send({
                    message: `Cannot update Borrow with id=${id}`
                });
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.delete = (req,res) => {
    const id = req.params.id;

    Borrow.destroy({
        where: { id: id }
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Borrow deleted successfully"
                });
            } else {
                res.send({
                    message: `Cannot delete Borrow with id=${id}`
                });
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message
            });
        });
}

exports.deleteAll = (req,res) => {
    Borrow.destroy({
        where: {},
        truncate: false
    })
        .then((nums) => {
            res.send({
                message: `${nums} Borrow deleted successfully`
            });
        }).catch((err) => {
            res.status(500).send({
                message: err.message
            })
        });
}
