import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Users } from './Users';
import { Eatery } from './Eaterys';

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

  @ForeignKey(() => Eatery)
  @Column({
    field: 'eatery_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  eateryId: number;

  @BelongsTo(() => Users)
  user: Users;

  @BelongsTo(() => Eatery)
  eatery: Eatery;
}
