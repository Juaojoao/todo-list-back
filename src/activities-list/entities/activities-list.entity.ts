import { ActivitiesList as PrismaActivitiesList } from 'prisma/prisma-client';

export class ActivitiesListEntity implements PrismaActivitiesList {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  frameId: number;
}
