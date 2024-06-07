import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { hash } from 'bcryptjs'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(3).max(130),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const passwordHash = await hash(password, 6)

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userAlreadyExists) {
    return reply.status(409).send({ message: 'User already exists.' })
  }

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  })

  return reply.status(201).send()
}
