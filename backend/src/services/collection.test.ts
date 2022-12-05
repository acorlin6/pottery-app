import { Collection, CollectionType, PrismaClient } from '@prisma/client';
import CollectionService from './collection';

const prisma = new PrismaClient();
const service = new CollectionService(prisma);

afterEach(async () => {
  await prisma.collection.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('getCollections', () => {
  it('Returns collections', async () => {
    await prisma.collection.createMany({
      data: [
        {
          title: 'Collection 1',
          description: 'A collection of pieces',
          type: CollectionType.RAKU,
        },
        {
          title: 'Collection 2',
          description: 'Another collection of pieces',
          type: CollectionType.STONEWARE,
        },
      ],
    });

    const collections = await service.getCollections();
    expect(collections).toHaveLength(2);
    expect(
      collections.find((c) => c.title === 'Collection 1')
    ).toEqual<Collection>({
      id: expect.any(Number),
      title: 'Collection 1',
      description: 'A collection of pieces',
      type: CollectionType.RAKU,
    });
    expect(
      collections.find((c) => c.title === 'Collection 2')
    ).toEqual<Collection>({
      id: expect.any(Number),
      title: 'Collection 2',
      description: 'Another collection of pieces',
      type: CollectionType.STONEWARE,
    });
  });

  it('Returns an empty list if no collections exist', async () => {
    const collections = await service.getCollections();
    expect(collections).toHaveLength(0);
  });
});

describe('createCollection', () => {
  it('Creates a collection and returns the created collection', async () => {
    const createdCollection = await service.createCollection({
      title: 'Collection 1',
      description: 'It is a collection',
      type: CollectionType.RAKU,
    });
    const lookedUpCollections = await prisma.collection.findMany();

    expect(createdCollection).toEqual<Collection>({
      id: expect.any(Number),
      title: 'Collection 1',
      description: 'It is a collection',
      type: CollectionType.RAKU,
    });
    expect(lookedUpCollections).toHaveLength(1);
    expect(lookedUpCollections[0]).toEqual<Collection>(createdCollection);
  });
});
