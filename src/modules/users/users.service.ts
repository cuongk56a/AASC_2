import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './schemas/user.schema'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: Partial<User>) {
    return await this.userModel.create(data)
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username })
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).select('-password')
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async update(id: string, data: Partial<User>) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
      if (data.email) {
        const existingUser = await this.userModel.findOne({ email: data.email, _id: { $ne: id } });
        if (existingUser) {
          throw new NotFoundException('Email already exists');
        }
      }
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }
      const updatedUser = await this.userModel.findByIdAndUpdate(id, data, { new: true }).select('-password');
      return updatedUser;
    }
}