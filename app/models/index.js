const config = require("../config/db.config.js");

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: 0,
        
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle,
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize,Sequelize);
db.role = require("../models/role.model.js")(sequelize,Sequelize);
db.avatar = require("../models/avatar.model.js")(sequelize,Sequelize);
db.author = require("../models/author.model.js")(sequelize,Sequelize);
db.book = require("../models/book.model.js")(sequelize,Sequelize);
db.borrower = require("../models/borrower.model.js")(sequelize,Sequelize);
db.borrow = require("../models/borrow.model.js")(sequelize,Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});
db.user.hasMany(db.avatar, {
    as: "avatars"
});
db.avatar.belongsTo(db.user, {
    foreignKey: "userId",
    as: "users"
});
db.author.hasMany(db.book, {
    as: "books"
});
db.book.belongsTo(db.author, {
    foreignKey: "authorId",
    as: "authors"
});
db.book.hasMany(db.borrow, {
    foreignKey: "bookCode",
    otherKey: "bookCode",
    as: "borrows"
});
db.borrower.hasMany(db.borrow, {
    foreignKey: "cardNumber",
    otherKey: "cardNumber",
    as: "borrows"
}); 
db.borrow.belongsTo(db.book, {
    foreignKey: "bookCode",
    otherKey: "bookCode",
    as: "books"
});
db.borrow.belongsTo(db.borrower, {
    foreignKey: "cardNumber",
    otherKey: "cardNumber",
    as: "borrowers"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

