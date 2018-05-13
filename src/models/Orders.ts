import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement} from 'sequelize-typescript';

@Table
export class Orders extends Model<Orders> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.UUIDV4)
    id: number;

    @Column(DataType.TEXT)
    title: string;

    @Column(DataType.TEXT)
    description: string;

    @Column(DataType.FLOAT)
    price: number;

    @CreatedAt
    @Column(DataType.DATE)
    createdAt: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    updatedAt: Date;
}