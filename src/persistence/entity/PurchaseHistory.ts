import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
} from 'sequelize-typescript';
import { Users } from './Users';
import { Products } from './Products';

@Table({
  tableName: 'purchase_history',
  timestamps: true,
  paranoid: true,
})
export class PurchaseHistory extends Model<PurchaseHistory> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  user_id: number;

  @ForeignKey(() => Products)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  product_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total_price: number;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'purchase_date',
  })
  purchase_date: Date;

  // Define relationships
  @BelongsTo(() => Users)
  user: Users;

  @BelongsTo(() => Products)
  product: Products;
}
