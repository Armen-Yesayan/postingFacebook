import {Column, Model, Table} from "sequelize-typescript";

@Table({tableName: 'refresh_tokens', underscored: true})
export class RefreshToken extends Model{
    @Column
    user_id: number;

    @Column
    is_revoked: boolean;

    @Column
    expires: Date;
}