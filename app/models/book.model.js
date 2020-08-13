module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {
        bookCode: {
            type: Sequelize.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        bookName: {
            type: Sequelize.STRING
        },
        pageNumber: {
            type: Sequelize.INTEGER
        },
        quantity: {
            type: Sequelize.INTEGER
        }
    });

    return Book;
}