import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { getMyTasks } from './get-my-tasks'

export async function tasksRoutes(app: FastifyInstance) {
  app.get('/tasks/me', { onRequest: [verifyJwt] }, getMyTasks)
  app.post('/tasks', { onRequest: [verifyJwt] }, create)
}
