import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchNearByGymsInUseCase } from '@/use-cases/factories/make-fetch-near-by-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearByGymQueryParams = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearByGymQueryParams.parse(request.params)

  const searchGymUserCase = makeFetchNearByGymsInUseCase()

  const { gyms } = await searchGymUserCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })
  return reply.code(200).send({
    gyms,
  })
}
