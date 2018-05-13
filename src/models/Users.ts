import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement} from 'sequelize-typescript';

@Table
export class Users extends Model<Users> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.UUIDV4)
    id: number;

    @Column(DataType.TEXT)
    name: string;

    @Column(DataType.TEXT)
    password: string;

    @Column(DataType.TEXT)
    email: string;

    @CreatedAt
    @Column(DataType.DATE)
    registeredAt: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    updatedAt: Date;
}