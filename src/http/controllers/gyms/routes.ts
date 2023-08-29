import { FastifyInstance } from 'fastify'
import { auth } from '@/http/middlerares/verify-jwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'
import { verifyUserRole } from '@/http/middlerares/verifiy-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  // all routes will be protected by default
  app.addHook('onRequest', auth)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
  app.post(
    '/gyms',
    {
      onRequest: [await verifyUserRole('ADMIN')],
    },
    create,
  )
}
