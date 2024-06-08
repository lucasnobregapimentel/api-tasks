import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/routes'
import jwt from '@fastify/jwt'
import { env } from './env/index'
import { ZodError } from 'zod'
import { tasksRoutes } from './http/controllers/tasks/routes'

export const app = fastify()

app.register(jwt, {
  secret: env.JWTSecret,
})

app.register(usersRoutes)
app.register(tasksRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
