import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeRegisterUseCase() {
  const repository = new PrismaUserRepository()
  const registerUseCase = new AuthenticateUseCase(repository)

  return registerUseCase
}
