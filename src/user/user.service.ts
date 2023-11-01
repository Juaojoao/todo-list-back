import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prismaService';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserDTO) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return 'User created successfully';
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async updatePassword(id: number, password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return 'Password updated successfully';
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async delete(id: number) {
    const user = await this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return 'User deleted successfully';
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    console.log('email', user.email);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
