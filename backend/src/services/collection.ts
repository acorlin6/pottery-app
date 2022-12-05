import { Collection, CollectionType, PrismaClient } from '@prisma/client';

interface CreateCollectionParams {
  title: string;
  description?: string;
  type: CollectionType;
}

export default class CollectionService {
  constructor(private prisma: PrismaClient) {}

  async getCollections(): Promise<Collection[]> {
    return await this.prisma.collection.findMany();
  }

  async createCollection({
    title,
    description,
    type,
  }: CreateCollectionParams): Promise<Collection> {
    return await this.prisma.collection.create({
      data: {
        title,
        description,
        type,
      },
    });
  }
}
