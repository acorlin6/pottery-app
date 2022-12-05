import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import 'source-map-support';
import initRoutes from '~/routes';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('Missing database url');

const prisma = new PrismaClient({ datasources: { db: { url: databaseUrl } } });

const app = fastify({ logger: true });
app.decorate('prisma', prisma);
app.addHook('onClose', async (_, done) => {
  await prisma.$disconnect();
  done();
})

app.get('/', (_request, reply) => reply.send({ hello: 'world' }));

initRoutes(app);

export default app;
