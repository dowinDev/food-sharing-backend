import { UserService } from '../service/users.service';
import { Controller } from '@nestjs/common';

@Controller('api/users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  // @Post('/')
  // createUser(req: ) {
  //   try {
  //     const user = this.usersService.createUser(req.body);
  //     res.json(user);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }
  //
  // async getUserById(req, res) {
  //   try {
  //     const user = await usersService.getUserById(req.params.id);
  //     if (user) {
  //       res.json(user);
  //     } else {
  //       res.status(404).json({ message: 'User not found' });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }
  //
  // async getAllUsers(req, res) {
  //   try {
  //     let users = await usersService.getAllUsers();
  //     res.json(users);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }
  //
  // async updateUser(req, res) {
  //   try {
  //     const updated = await usersService.updateUser(req.params.id, req.body);
  //     res.json({ updated });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }
  //
  // async deleteUser(req, res) {
  //   try {
  //     await usersService.deleteUser(req.params.id);
  //     res.status(204).send();
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }
}
