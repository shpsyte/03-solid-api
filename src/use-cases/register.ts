import { prisma } from '@/lib/prisma'
import { PrismaUserRepository } from '@/repositories/prisma-user-repository'
import { hash } from 'bcryptjs'

type RegsiterUseCaseRequest = {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegsiterUseCaseRequest) {
  const pwdHash = await hash(password, 6)

  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user) {
    return { id: user.id, name: user.name, email: user.email }
  }

  const prismaUserRepository = new PrismaUserRepository()

  user = await prismaUserRepository.create({
    name,
    email,
    password_hash: pwdHash,
  })

  return { id: user.id, name: user.name, email: user.email }
}
