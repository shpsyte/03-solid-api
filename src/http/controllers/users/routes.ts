import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { auth } from '@/http/middlerares/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.get(
    '/me',
    {
      onRequest: [auth],
    },
    profile,
  )
}
