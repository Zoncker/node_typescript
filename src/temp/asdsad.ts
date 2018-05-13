// import {
//     Sequelize,
//     DataTypes
// } from 'sequelize';
//
//  interface UserAttributes {
//     name ? : string;
//     email ? : string;
//     password ? : string;
//
// }
//
//  interface UserInstance {
//     id: number;
//     createdAt: Date;
//     updatedAt: Date;
//
//     name: string;
//     email: string;
//     password: string;
//
// }
//
// export = (sequelize: Sequelize, DataTypes: DataTypes) => {
//     var Users = sequelize.define('Users', {
//         name: DataTypes.TEXT,
//         email: DataTypes.TEXT,
//         password: DataTypes.TEXT
//     });
//
//     Users.associate = function(models) {
//         // associations can be defined here
//     };
//
//     return Users;
// };
