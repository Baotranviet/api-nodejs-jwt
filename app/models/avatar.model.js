module.exports= (sequelize, Sequelize) => {
    const Avatar = sequelize.define("avatars", {
        type: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        data: {
            type: Sequelize.BLOB('long')
        }
    });

    return Avatar;
}