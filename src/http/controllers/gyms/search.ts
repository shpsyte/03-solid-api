import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchGymsInUseCase } from '@/use-cases/factories/make-search-gyms-user-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQueryParams = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q: query, page } = searchGymQueryParams.parse(request.params)

  const searchGymUserCase = makeSearchGymsInUseCase()

  const { gyms } = await searchGymUserCase.execute({
    query,
    page,
  })
  return reply.code(200).send({
    gyms,
  })
}
