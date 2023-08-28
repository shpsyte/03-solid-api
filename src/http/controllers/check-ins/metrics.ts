import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUserGetUserMatricsUseCase } from '@/use-cases/factories/make-get-user-matrics.use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeUserGetUserMatricsUseCase()

  const { checkInsCount } = await useCase.execute({
    userId: request.user.sub,
  })
  return reply.code(200).send({
    checkInsCount,
  })
}
