import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Users } from './Users';
import { Products } from './Products';

@Table({
  tableName: 'feedbacks',
  timestamps: false,
  paranoid: false,
})
export class FeedBacks extends Model<FeedBacks> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    field: 'message',
    type: DataType.STRING,
    allowNull: false,
  })
  message: string;

  @Column({
    field: 'rating',
    type: DataType.INTEGER,
    allowNull: true,
  })
  rating: number;

  @ForeignKey(() => Users)
  @Column({
    field: 'user_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Products)
  @Column({
    field: 'product_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @BelongsTo(() => Users)
  user: Users;

  @BelongsTo(() => Products)
  product: Products;
}
