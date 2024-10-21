import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Users } from './Users';

@Table({
  tableName: 'accounts',
  timestamps: true,
  paranoid: true,
})
export class Accounts extends Model<Accounts> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    field: 'role',
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;

  @ForeignKey(() => Users)
  @Column({
    field: 'user_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => Users)
  user: Users;
}
