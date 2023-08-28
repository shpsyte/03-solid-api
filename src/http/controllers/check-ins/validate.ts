import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInIdSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInIdSchema.parse(request.params)

  const useCase = makeValidateCheckInUseCase()

  const checkin = await useCase.execute({
    checkInId,
  })
  return reply.code(204).send({ checkin })
}
