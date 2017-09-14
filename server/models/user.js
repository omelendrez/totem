const bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 50]
            }
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userFullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userPhoto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userStatus: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
    }, {
        indexes: [{
            unique: true,
            fields: ["userName"]
        }],
        individualHooks: true,
        freezeTableName: true,
        hooks: {
            beforeCreate: user => {
                const salt = bcrypt.genSaltSync();
                user.userPassword = bcrypt.hashSync(user.userPassword, salt);
            },
            beforeUpdate: user => {
                const salt = bcrypt.genSaltSync();
                user.userPassword = bcrypt.hashSync(user.userPassword, salt);
            }
        }
    });

    return User;
};
