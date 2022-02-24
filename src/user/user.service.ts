import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = new this.userModel(createUserDto);
    const findUser = await this.userModel.findOne({ email }).exec();
    if (findUser) {
      throw new ConflictException('Usuário já cadastrado');
    }
    user.save();
    return { message: 'Usuário cadastrado com sucesso' };
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  async getByEmail(email: string): Promise<User> {
    const findUser = await this.userModel.findOne({ email }).exec();
    return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userModel.updateOne({ id }, { ...updateUserDto });
    return { message: `Usuário ${id} atualizado com sucesso` };
  }

  async remove(id: number) {
    await this.userModel.deleteOne({ id });
    return { message: `Usuário deletado com sucesso` };
  }
}
