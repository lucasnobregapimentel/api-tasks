import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'

export async function deleteTask(request: FastifyRequest, reply: FastifyReply) {
  const toggleStateParamsSchema = z.object({
    taskId: z.string(),
  })

  const { taskId } = toggleStateParamsSchema.parse(request.params)

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
      userId: request.user.sub,
    },
  })

  if (!task) {
    return reply.status(404).send({ message: 'Task not found.' })
  }

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  })

  return reply.status(204).send()
}
