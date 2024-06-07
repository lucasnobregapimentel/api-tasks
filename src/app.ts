import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/routes'
import jwt from '@fastify/jwt'
import { env } from './env/index'

export const app = fastify()

app.register(jwt, {
  secret: env.JWTSecret,
})

app.register(usersRoutes)
