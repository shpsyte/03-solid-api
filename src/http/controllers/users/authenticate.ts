import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialError } from '@/use-cases/errors/invalid-credential-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-auhenticate-use-case copy'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        email,
        name: user.name,
        role: 'MEMBER',
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply.code(200).send({
      user: {
        id: user.id,
        name: user.name,
      },
      token,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return reply.code(409).send({
        message: err.message,
      })
    }

    throw err
  }
}
