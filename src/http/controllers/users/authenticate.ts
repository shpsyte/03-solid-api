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
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )
    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d', // 7 days to expire if user doesn't login
        },
      },
    )

    return reply
      .code(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/', // all routes
        httpOnly: true, // only http request can access this cookie
        secure: process.env.NODE_ENV === 'production', // only https
        sameSite: 'lax', // csrf protection, // true, // only same domain, // false, // any domain
      })
      .send({
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
