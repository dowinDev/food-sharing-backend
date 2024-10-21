import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Eatery } from './Eaterys';
import { ProductUserXref } from './ProductUserXref';

@Table({
  tableName: 'products',
  timestamps: true,
  paranoid: true,
})
export class Products extends Model<Products> {
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
  nameProduct: string;

  @Column({
    field: 'expiration_date',
    type: DataType.DATE,
    allowNull: true,
  })
  expirationDate: Date;

  @Column({
    field: 'quantity',
    type: DataType.INTEGER,
    allowNull: true,
  })
  quantity: number;

  @Column({
    field: 'contact',
    type: DataType.STRING,
    allowNull: true,
  })
  contact: string;

  @Column({
    field: 'price',
    type: DataType.STRING,
    allowNull: true,
  })
  price: string;

  @Column({
    field: 'description',
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    field: 'image',
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  @ForeignKey(() => Eatery)
  @Column({
    field: 'eatery_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  eateryId: number;

  @BelongsTo(() => Eatery)
  eatery: Eatery;

  @HasMany(() => ProductUserXref)
  productUserXrefs: ProductUserXref[];
}
