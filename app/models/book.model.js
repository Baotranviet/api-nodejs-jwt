module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {
        bookCode: {
            type: Sequelize.STRING
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