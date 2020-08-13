module.exports = (sequelize, Sequelize) => {
    const Borrower = sequelize.define("borrowers", {
        cardNumber: {
            type: Sequelize.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        name: {
            type: Sequelize.STRING
        },
        dayOfBirth: {
            type: Sequelize.DATE
        },
        class: {
            type: Sequelize.STRING
        },
    });

    return Borrower;
};