import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { getMyTasks } from './get-my-tasks'
import { toggleStatus } from './toggle-status'
import { deleteTask } from './delete'

export async function tasksRoutes(app: FastifyInstance) {
  app.get('/tasks/me', { onRequest: [verifyJwt] }, getMyTasks)
  app.post('/tasks', { onRequest: [verifyJwt] }, create)
  app.put('/tasks/:taskId', { onRequest: [verifyJwt] }, toggleStatus)
  app.delete('/tasks/:taskId', { onRequest: [verifyJwt] }, deleteTask)
}
