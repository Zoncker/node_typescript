import {Sequelize} from "sequelize-typescript";

export const sequelize = new Sequelize({
    database: 'node',
    dialect: 'mysql',
    username: 'root',
    password: 'root',
    storage: ':memory:',
    modelPaths: [__dirname + '/models']
});