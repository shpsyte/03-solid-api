import { FastifyReply, FastifyRequest } from 'fastify'

export async function auth(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (error) {
    reply.code(401).send({
      message: 'Unauthorized',
    })
  }
}
