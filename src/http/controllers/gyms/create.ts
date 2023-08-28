import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateGymInUseCase } from '@/use-cases/factories/make-create-gym'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, latitude, longitude, phone } =
    createBodySchema.parse(request.body)

  const createGymUseCase = makeCreateGymInUseCase()

  const gym = await createGymUseCase.execute({
    latitude,
    longitude,
    title,
    description,
    phone,
  })
  return reply.code(200).send({
    message: 'Gym create sussefly',
    gym,
  })
}
