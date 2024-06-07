import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { compare } from 'bcryptjs'
import { app } from '../../../app'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(130),
  })

  const { email, password } = registerBodySchema.parse(request.body)

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return reply.status(401).send({ message: 'Invalid credentials.' })
  }

  const doesPasswordMatches = await compare(password, user.passwordHash)

  if (!doesPasswordMatches) {
    return reply.status(401).send({ message: 'Invalid credentials.' })
  }

  const token = app.jwt.sign(
    {
      name: user.name,
    },
    {
      sub: user.id,
      expiresIn: '30 days',
    },
  )

  return {
    token,
  }
}
