import { Frame as PrismaFrame } from '@prisma/client';

export class FrameEntity implements PrismaFrame {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
