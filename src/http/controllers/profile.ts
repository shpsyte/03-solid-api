import { makeGetuserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  // requeset.user a adicionada automaticamente pelo fastify-jwt
  console.log(request.user.sub)

  const getUserProfile = makeGetuserProfileUseCase()

  const user = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.code(200).send({
    user: {
      ...user?.user,
      password_hash: undefined,
    },
  })
}
