import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    description: z.string(),
  })

  const { description } = createBodySchema.parse(request.body)

  await prisma.task.create({
    data: {
      description,
      userId: request.user.sub,
    },
  })

  return reply.status(201).send()
}
