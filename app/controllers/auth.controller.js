const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

let {signUpValidator} = require('../validators/auth.validator');
let {signInValidator} = require('../validators/auth.validator');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    let validator = await signUpValidator(req);
    if (validator !== null) {
      return res.send({message: validator});
    }  
    //Save User to Database
    User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
          })
          .then(user => {
            if (req.body.roles) {
              Role.findAll({
                where: {
                  name: {
                    [Op.or]: req.body.roles
                  }
                }
              }).then(roles => {
                user.setRoles(roles).then(() => {
                  res.send({ message: "User was registered successfully"});
                });
              });
            } else {
              // user role = 1
              user.setRoles([1]).then(() => {
                res.send({message: "User was registered successfully"});
              });
            }
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
    } catch (error) {
      return res.status(500).send({error: error});
  }
  
}

exports.signin = async (req, res) => {
  try {
    let validator = await signInValidator(req);
    if (validator !== null) {
      return res.send({ message: validator });
    }

    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
          );
          
          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
          
          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });
          
          var authorities = [];
          user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
              authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
              id: user.id,
              username: user.username,
              email: user.email,
              roles: authorities,
              accessToken: token
            });
          });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
      } catch (error) {
        return res.status(500).send({error: error});
      }
};