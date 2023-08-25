import { RegisterGymUseCase } from '../create-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCreateGymInUseCase() {
  const repository = new PrismaGymsRepository()
  const useCase = new RegisterGymUseCase(repository)

  return useCase
}
