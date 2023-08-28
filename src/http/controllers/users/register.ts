import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const registerUseCase = makeRegisterUseCase()

  try {
    const user = await registerUseCase.execute({
      name,
      email,
      password,
    })
    return reply.code(200).send({
      message: 'Customer create sussefly',
      user,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.code(409).send({
        message: err.message,
      })
    }

    throw err
  }
}
