import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const repository = new PrismaUserRepository()
  const registerUseCase = new RegisterUseCase(repository)

  return registerUseCase
}
