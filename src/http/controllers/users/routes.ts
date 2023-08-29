import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { auth } from '@/http/middlerares/verify-jwt'
import { refresh } from './refresh'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  // nao adicionamos o auth no refresh pois o refresh é o unico endpoint que não precisa de token
  app.patch('/token/refresh', refresh)
  app.get(
    '/me',
    {
      onRequest: [auth],
    },
    profile,
  )
}
