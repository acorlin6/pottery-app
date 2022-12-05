import fastify from 'fastify';
import initRoutes from './collection';
import CollectionService from '~/services/collection';
import { CollectionType } from '@prisma/client';

export const mockGetCollections = jest.fn();
export const mockCreateCollection = jest.fn();

jest.mock('~/services/collection', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getCollections: mockGetCollections,
      createCollection: mockCreateCollection,
    };
  });
});

beforeEach(() => {
  jest.mocked(CollectionService).mockClear();
  mockGetCollections.mockClear();
});

const app = fastify();
initRoutes(app);

describe('GET /collections', () => {
  it('Returns a list of collections', async () => {
    mockGetCollections.mockResolvedValueOnce([
      {
        id: 1,
        title: 'Collection',
        description: 'A set of pieces',
        type: CollectionType.RAKU,
      },
    ]);
    const results = await app.inject().get('/collections').end();
    // expect(results.statusCode).toEqual(200);
    expect(results.json()).toEqual({
      collections: [
        {
          id: 1,
          title: 'Collection',
          description: 'A set of pieces',
          type: CollectionType.RAKU,
        },
      ],
    });
  });

  it('Returns an empty list of collections', async () => {
    mockGetCollections.mockResolvedValueOnce([]);
    const results = await app.inject().get('/collections').end();
    expect(results.statusCode).toEqual(200);
    expect(results.json()).toEqual({
      collections: [],
    });
  });
});

describe('POST /collections', () => {
  it('Creates a collection and returns it', async () => {
    const mockResult = {
      id: 1,
      title: 'Collection',
      description: 'A set of pieces',
      type: CollectionType.RAKU,
    };
    mockCreateCollection.mockResolvedValueOnce(mockResult);
    const body = {
      title: 'Collection',
      description: 'A set of pieces',
      type: CollectionType.RAKU,
    };
    const results = await app.inject().post('/collections').body(body).end();
    expect(results.statusCode).toEqual(200);
    expect(results.json()).toEqual(mockResult);

    expect(mockCreateCollection).toHaveBeenCalledTimes(1);
    expect(mockCreateCollection).toHaveBeenCalledWith(body);
  });
});
