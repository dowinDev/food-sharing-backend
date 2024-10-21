import { Injectable } from '@nestjs/common';

import { UsersRepository } from '../persistence/repository/users.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // async createUser() {
  //   return await UsersRepository.createPost(data);
  // }
  //
  // async getUserById(id) {
  //   return await UsersRepository.getUserById(id);
  // }
  //
  // async getAllUsers() {
  //   return await UsersRepository.getAllUsers();
  // }
  //
  // async updateUser(id, data) {
  //   return await UsersRepository.updateUser(id, data);
  // }
  //
  // async deleteUser(id) {
  //   return await UsersRepository.deleteUser(id);
  // }
}
