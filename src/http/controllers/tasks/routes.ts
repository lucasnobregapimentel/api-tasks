import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJwt } from '../../middlewares/verify-jwt'

export async function tasksRoutes(app: FastifyInstance) {
  app.post('/tasks', { onRequest: [verifyJwt] }, create)
}
