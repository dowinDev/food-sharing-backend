import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Accounts } from './Accounts';
import { Eatery } from './Eaterys';
import { FeedBacks } from './FeedBacks';
import { ContactsUs } from './ContactsUs';
import { ProductUserXref } from './ProductUserXref';
import { PurchaseHistory } from './PurchaseHistory';

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
export class Users extends Model<Users> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    field: 'user_name',
    type: DataType.STRING,
    allowNull: false,
  })
  userName: string;

  @Column({
    field: 'password',
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    field: 'first_name',
    type: DataType.STRING,
    allowNull: true,
  })
  firstName: string;

  @Column({
    field: 'last_name',
    type: DataType.STRING,
    allowNull: true,
  })
  lastName: string;

  @Column({
    field: 'source',
    type: DataType.STRING,
    allowNull: true,
  })
  source: string;

  @Column({
    field: 'avatar',
    type: DataType.STRING,
    allowNull: true,
  })
  avatar: string;

  @Column({
    field: 'phone',
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;

  @Column({
    field: 'address',
    type: DataType.STRING,
    allowNull: true,
  })
  address: string;

  @Column({
    field: 'secret_key',
    type: DataType.STRING,
    allowNull: true,
  })
  secretKey: string;

  @Column({
    field: 'reset_key',
    type: DataType.STRING,
    allowNull: true,
  })
  resetKey: string;

  @Column({
    field: 'birth_day',
    type: DataType.DATE,
    allowNull: true,
  })
  birthDay: Date;

  @Column({
    field: 'email',
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @HasMany(() => Accounts)
  accounts: Accounts[];

  @HasMany(() => Eatery)
  eateries: Eatery[];

  @HasMany(() => FeedBacks)
  feedbacks: FeedBacks[];

  @HasMany(() => ContactsUs)
  contactsUs: ContactsUs[];

  @HasMany(() => ProductUserXref)
  productUserXrefs: ProductUserXref[];

  @HasMany(() => PurchaseHistory)
  purchaseHistory: PurchaseHistory[];
}
