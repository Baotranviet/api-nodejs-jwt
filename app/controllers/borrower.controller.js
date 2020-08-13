const db = require("../models");
const Borrower = db.borrower;

exports.create = async (req,res) => {
    if (!req.body.cardNumber ||
        !req.body.dayOfBirth ||
        !req.body.name ||
        !req.body.class) {
        res.status(400).send({
            message: "Value is required"
        });
        return ;
    }

    const borrower = {
        cardNumber: req.body.cardNumber,
        dayOfBirth: req.body.dayOfBirth,
        name: req.body.name,
        class: req.body.class
    };

    Borrower.create(borrower)
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
    Borrower.findAll({ include: ["borrows"] })
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message : err.message
            });
        });
};

exports.findOne = (req,res) => {
    var cardNumber = req.params.cardNumber;
    cardNumber = cardNumber.toString();

    Borrower.findByPk(cardNumber, { include: ["borrows"] })
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
    var cardNumber = req.params.cardNumber;
    cardNumber = cardNumber.toString();

    Borrower.update(req.body, {
        where: { cardNumber: cardNumber }
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Borrower updated successfully"
                });
            } else {
                res.send({
                    message: `Cannot update Borrower with cardNumber=${cardNumber}`
                });
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.delete = (req,res) => {
    var cardNumber = req.params.cardNumber;
    cardNumber = cardNumber.toString();

    Borrower.destroy({
        where: { cardNumber: cardNumber }
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Borrower deleted successfully"
                });
            } else {
                res.send({
                    message: `Cannot delete Borrower with cardNumber=${cardNumber}`
                });
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message
            });
        });
}

exports.deleteAll = (req,res) => {
    Borrower.destroy({
        where: {},
        truncate: false
    })
        .then((nums) => {
            res.send({
                message: `${nums} Borrower deleted successfully`
            });
        }).catch((err) => {
            res.status(500).send({
                message: err.message
            })
        });
}
