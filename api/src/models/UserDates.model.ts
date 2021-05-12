import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table({
    tableName: 'user_dates',
    updatedAt: false,
    createdAt: false,
})
export class UserDates extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    userId: number;

    @AllowNull(false)
    @Column(DataType.DATE)
    registrationDate: Date;

    @AllowNull(false)
    @Column(DataType.DATE)
    lastActivityDate: Date;
}
