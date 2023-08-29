import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({
    onlyCookie: true,
  })

  const { role } = request.user

  const token = await reply.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )
  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
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
      token,
    })
}
