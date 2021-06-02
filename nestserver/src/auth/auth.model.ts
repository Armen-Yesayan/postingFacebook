import {Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table
export class User extends Model {
    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column
    password: string
}