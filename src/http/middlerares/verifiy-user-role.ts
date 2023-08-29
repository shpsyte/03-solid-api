import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyUserRole(role: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role: roleInUser } = request.user
    if (role !== roleInUser) {
      return reply.code(401).send({
        message: 'Unauthorized',
      })
    }
  }
}
