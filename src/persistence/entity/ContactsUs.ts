import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from './Users';

@Table({
  tableName: 'contacts_us',
  timestamps: false,
  paranoid: false,
})
export class ContactsUs extends Model<ContactsUs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    field: 'messages',
    type: DataType.STRING,
    allowNull: true,
  })
  messages: string;

  @ForeignKey(() => Users)
  @Column({
    field: 'user_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => Users)
  role: Users;
}
