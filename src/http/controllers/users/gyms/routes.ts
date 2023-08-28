import { FastifyInstance } from 'fastify'
import { auth } from '@/http/middlerares/verify-jwt'

export async function gymsRoutes(app: FastifyInstance) {
  // all routes will be protected by default
  app.addHook('onRequest', auth)
}
