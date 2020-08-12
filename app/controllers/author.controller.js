const db = require("../models");
const Author = db.author;

exports.create = (req,res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Name is required"
        });
        return ;
    }

    const author = {
        name: req.body.name
    };

    Author.create(author)
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
    Author.findAll({ include: "books" })
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

    Author.findByPk(id, { include: "books" })
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.update = (req,res) => {
    const id = req.params.id;

    Author.update(req.body, {
        where: { id: id }
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Author was updated successfully"
                });
            } else {
                res.send({
                    message: `Cannot update Author with id=${id}. Maybe Author was not found or req.body is empty!`
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

    Author.destroy({
        where: { id: id }
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Author was deleted successfully"
                });
            } else {
                res.send({
                    message: `Cannot delete Author with id=${id}. Maybe Author was not found`
                });
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message
            });
        });
}

exports.deleteAll = (req,res) => {
    Author.destroy({
        where: {},
        truncate: false
    })
        .then((nums) => {
            res.send({
                message: `${nums} Author were deleted successfully`
            });
        }).catch((err) => {
            res.status(500).send({
                message: err.message
            })
        });
}
