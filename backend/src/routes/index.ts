import { FastifyInstance } from 'fastify';
import initCollectionRoutes from './collection';

export default function initRoutes(app: FastifyInstance) {
  initCollectionRoutes(app);
}
