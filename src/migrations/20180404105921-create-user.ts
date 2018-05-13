import {
    QueryInterface,
    SequelizeStatic
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
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

    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.dropTable('Users');
    }
};
