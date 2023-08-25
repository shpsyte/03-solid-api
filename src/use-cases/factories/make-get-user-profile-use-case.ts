import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetuserProfileUseCase() {
  const repository = new PrismaUserRepository()
  const useCase = new GetUserProfileUseCase(repository)

  return useCase
}
