import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { userRoutes } from './http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { checkInsRoutes } from './http/controllers/check-ins/route'
import cookie from '@fastify/cookie'
const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken', // the cookie name, required for `cookie` sign and verify
    signed: false, // don't sign the cookie with JWT (not secure)
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(cookie)

app.register(userRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.code(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(`💀 error 
                      message: ${error.message}
                      stack: ${error.stack}
    `)
  } else {
    // must log error in a log service
  }

  reply.code(500).send({
    message: 'Internal server error',
  })
})

export { app }
