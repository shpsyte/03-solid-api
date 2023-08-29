import { FastifyInstance } from 'fastify'
import { auth } from '@/http/middlerares/verify-jwt'
import { create } from './create'
import { validate } from './validate'
import { metrics } from './metrics'
import { history } from './history'
import { verifyUserRole } from '@/http/middlerares/verifiy-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  // all routes will be protected by default
  app.addHook('onRequest', auth)

  app.get('/check-ins/metrics', metrics)
  app.get('/check-ins/history', history)

  app.post('/check-ins/:gymId/check-ins', create)
  app.patch(
    '/check-ins/:checkInId/validate',
    {
      onRequest: [await verifyUserRole('ADMIN')],
    },
    validate,
  )
}
