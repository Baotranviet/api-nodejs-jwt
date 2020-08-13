module.exports = (sequelize, Sequelize) => {
    const Borrow = sequelize.define("borrows", {
        borrowDate: {
            type: Sequelize.DATE
        },
        payDate: {
            type: Sequelize.DATE
        }
    });

    return Borrow;
};