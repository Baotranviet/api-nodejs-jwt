const db = require("../models");
const Borrower = db.borrower;

let {borrowerValidator} = require('../validators/borrower.validator');

exports.create = async (req,res) => {
    try {
        let validator = await borrowerValidator(req);
        if (validator !== null) {
            return res.send({message: validator});
        }

        if (!req.body.cardNumber ||
            !req.body.dayOfBirth ||
            !req.body.name ||
            !req.body.class) {
            res.status(400).send({
                message: "Value is required"
            });
            return ;
        }

        var borrower = {
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
    } catch (error) {
        res.status(500).send({
            error: error.message
        }); 
    }  
};

exports.findAll = async (req,res) => {
    Borrower.findAll()
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message
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

exports.update = async (req,res) => {
    try {
        let validator = await borrowerValidator(req);
        if (validator !== null) {
            return res.send({message: validator});
        }
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
    } catch (error) {
        res.status(500).send({
            error: error.message
        }); 
    }  
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


exports.queryBorrowerShow = async (req,res) => {

    borrowers = await db.sequelize.query('SELECT borrowers.name, COUNT(borrows.cardNumber) as number_of_borrow FROM borrowers LEFT JOIN borrows ON borrowers.cardNumber = borrows.cardNumber GROUP BY borrowers.name', { type: db.sequelize.QueryTypes.SELECT });
    if (!borrowers) {
        return res.send({ message: "Not found" })
    }
    res.status(200).json({ borrowers: borrowers });
};

exports.queryBorrowerNotReturned = async (req,res) => {

    borrowers = await db.sequelize.query('SELECT borrowers.name FROM borrowers INNER JOIN borrows ON borrowers.cardNumber = borrows.cardNumber WHERE borrows.payDate IS NULL', { type: db.sequelize.QueryTypes.SELECT });
    if (!borrowers) {
        return res.send({ message: "Not found" })
    }
    res.status(200).json({ borrowers: borrowers });
};
