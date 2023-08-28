import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckINParscheme = z.object({
    gymId: z.string().uuid(),
  })
  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckINParscheme.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const useCase = makeCheckInUseCase()

  const checkin = await useCase.execute({
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
    userId: request.user.sub,
  })
  return reply.code(200).send({
    checkin,
  })
}
