module.exports = (sequelize, Sequelize) => {
    const Author = sequelize.define("authors", {
        name: {
            type: Sequelize.STRING
        }
    });

    return Author;
}