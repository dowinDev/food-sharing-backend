import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Accounts } from './Accounts';
import { Eatery } from './Eaterys';
import { FeedBacks } from './FeedBacks';
import { ContactsUs } from './ContactsUs';
import { ProductUserXref } from './ProductUserXref';

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

  // // create setter and getter for table Users
  // // setter and getter for Id
  // set setId(id: number) {
  //   this.setDataValue('id', id);
  // }
  //
  // get getId(): number {
  //   return this.getDataValue('id');
  // }
  //
  // // setter and getter for UserName
  // set setUserName(userName: string) {
  //   this.setDataValue('userName', userName);
  // }
  //
  // get getUserName(): string {
  //   return this.getDataValue('userName');
  // }
  //
  // // setter and getter for Password
  // set setPassword(password: string) {
  //   this.setDataValue('password', password);
  // }
  //
  // get getPassword(): string {
  //   return this.getDataValue('password');
  // }
  //
  // // setter and getter for FirstName
  // set setFirstName(firstName: string) {
  //   this.setDataValue('firstName', firstName);
  // }
  //
  // get getFirstName(): string {
  //   return this.getDataValue('firstName');
  // }
  //
  // // setter and getter for LastName
  // set setLastName(lastName: string) {
  //   this.setDataValue('lastName', lastName);
  // }
  //
  // get getLastName(): string {
  //   return this.getDataValue('lastName');
  // }
  //
  // // setter and getter for Source
  // set setSource(source: string) {
  //   this.setDataValue('source', source);
  // }
  //
  // get getSource(): string {
  //   return this.getDataValue('source');
  // }
  //
  // // setter and getter for Avatar
  // set setAvatar(avatar: string) {
  //   this.setDataValue('avatar', avatar);
  // }
  //
  // get getAvatar(): string {
  //   return this.getDataValue('avatar');
  // }
  //
  // // setter and getter for Phone
  // set setPhone(phone: string) {
  //   this.setDataValue('phone', phone);
  // }
  //
  // get getPhone(): string {
  //   return this.getDataValue('phone');
  // }
  //
  // // setter and getter for Address
  // set setAddress(address: string) {
  //   this.setDataValue('address', address);
  // }
  //
  // get getAddress(): string {
  //   return this.getDataValue('address');
  // }
  //
  // // setter and getter for SecretKey
  // set setSecretKey(secretKey: string) {
  //   this.setDataValue('secretKey', secretKey);
  // }
  //
  // get getSecretKey(): string {
  //   return this.getDataValue('secretKey');
  // }
  //
  // // setter and getter for ResetKey
  // set setResetKey(resetKey: string) {
  //   this.setDataValue('resetKey', resetKey);
  // }
  //
  // get getResetKey(): string {
  //   return this.getDataValue('resetKey');
  // }
  //
  // // setter and getter for BirthDay
  // set setBirthDay(birthDay: Date) {
  //   this.setDataValue('birthDay', birthDay);
  // }
  //
  // get getBirthDay(): Date {
  //   return this.getDataValue('birthDay');
  // }
  //
  // // setter and getter for Email
  // set setEmail(email: string) {
  //   this.setDataValue('email', email);
  // }
  //
  // get getEmail(): string {
  //   return this.getDataValue('email');
  // }
  //
  // // setter and getter for Accounts
  // set setAccounts(accounts: Accounts[]) {
  //   this.setDataValue('accounts', accounts);
  // }
  //
  // get getAccounts(): Accounts[] {
  //   return this.getDataValue('accounts');
  // }
  //
  // // setter and getter for Eateries
  // set setEateries(eateries: Eatery[]) {
  //   this.setDataValue('eateries', eateries);
  // }
  //
  // get getEateries(): Eatery[] {
  //   return this.getDataValue('eateries');
  // }
  //
  // // setter and getter for Feedbacks
  // set setFeedbacks(feedbacks: FeedBacks[]) {
  //   this.setDataValue('feedbacks', feedbacks);
  // }
  //
  // get getFeedbacks(): FeedBacks[] {
  //   return this.getDataValue('feedbacks');
  // }
}
