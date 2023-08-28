import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchNearByGymsInUseCase } from '@/use-cases/factories/make-fetch-near-by-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearByGymQueryParams = z.object({
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  })

  try {
    const { latitude, longitude } = nearByGymQueryParams.parse(request.query)

    const searchGymUserCase = makeFetchNearByGymsInUseCase()

    const { gyms } = await searchGymUserCase.execute({
      userLatitude: latitude,
      userLongitude: longitude,
    })
    return reply.code(200).send({
      gyms,
    })
  } catch (error) {
    console.log(error)
    return reply.code(400).send({
      message: error,
    })
  }
}
