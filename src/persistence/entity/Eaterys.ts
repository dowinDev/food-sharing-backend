import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Users } from './Users';
import { Products } from './Products';
import { FeedBacks } from './FeedBacks';

@Table({
  tableName: 'eatery',
  timestamps: true,
  paranoid: true,
})
export class Eatery extends Model<Eatery> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    field: 'name',
    type: DataType.STRING,
    allowNull: false,
  })
  nameStore: string;

  @Column({
    field: 'location',
    type: DataType.STRING,
    allowNull: true,
  })
  location: string;

  @Column({
    field: 'phone',
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;

  @ForeignKey(() => Users)
  @Column({
    field: 'user_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => Users)
  user: Users;

  @HasMany(() => Products)
  products: Products[];
}
