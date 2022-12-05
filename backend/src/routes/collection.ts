import { Collection, CollectionType } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import CollectionService from '~/services/collection';

interface GetCollectionsRequest {
  Reply: { collections: Collection[] };
}

interface CreateCollectionRequest {
  Body: {
    title: string;
    description: string;
    type: CollectionType;
  };
  Reply: Collection;
}

export default function initRoutes(app: FastifyInstance) {
  app.get<GetCollectionsRequest>('/collections', async () => {
    const service = new CollectionService(app.prisma);
    const collections = await service.getCollections();
    return { collections };
  });

  app.post<CreateCollectionRequest>('/collections', async (request) => {
    const service = new CollectionService(app.prisma);
    const collection = await service.createCollection({
      title: request.body.title,
      description: request.body.description,
      type: request.body.type,
    });
    return collection;
  });
}
