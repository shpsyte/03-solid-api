import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'




export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const data = await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  })

  return reply.code(200).send({
    message: 'Customer create sussefly',
    data: {
      id: data.id,
      email: data.email,
      name: data.name
    }
  })
}


