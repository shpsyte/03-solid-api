import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const registerUseCase = new RegisterUseCase(new PrismaUserRepository())
  let user = null

  try {
    user = await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.code(409).send({
        message: error.message,
      })
    }
    return reply.code(500).send() // TODO: improve this error
  }

  return reply.code(200).send({
    message: 'Customer create sussefly',
    user,
  })
}
