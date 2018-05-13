"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.TEXT
            },
            email: {
                type: Sequelize.TEXT
            },
            password: {
                type: Sequelize.TEXT
            },
            registeredAt: {
                allowNull: false,
                defaultValue: new Date(),
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                defaultValue: new Date(),
                type: Sequelize.DATE
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Users');
    }
};
