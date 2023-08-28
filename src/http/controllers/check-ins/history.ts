import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFatchUserCheckInHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistorySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistorySchema.parse(request.query)

  const useCase = makeFatchUserCheckInHistoryUseCase()

  const { checkIns } = await useCase.execute({
    userId: request.user.sub,
    page,
  })
  return reply.code(200).send({
    checkIns,
  })
}
