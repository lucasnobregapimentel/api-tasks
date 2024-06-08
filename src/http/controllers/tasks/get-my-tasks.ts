import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'

export async function getMyTasks(request: FastifyRequest, reply: FastifyReply) {
  const tasks = await prisma.task.findMany({
    where: {
      userId: request.user.sub,
    },
  })

  return reply.status(200).send({ tasks })
}
