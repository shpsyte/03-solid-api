import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { InvalidCredentialError } from '@/use-cases/errors/invalid-credential-error'

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
    const userRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(userRepository)
    await authenticateUseCase.execute({
      email,
      password,
    })

    return reply.code(200).send({
      message: 'Ok',
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
