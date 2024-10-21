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
  tableName: 'product_user_xref',
  timestamps: false,
  paranoid: false,
})
export class ProductUserXref extends Model<ProductUserXref> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    field: 'quantity',
    type: DataType.INTEGER,
    allowNull: true,
  })
  quantity: number;

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
