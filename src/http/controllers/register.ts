import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const registerUseCase = new RegisterUseCase(new PrismaUserRepository())

  const user = await registerUseCase.execute({
    name,
    email,
    password,
  })

  return reply.code(200).send({
    message: 'Customer create sussefly',
    user,
  })
}
