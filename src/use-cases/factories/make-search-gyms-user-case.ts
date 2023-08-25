import { SearchGymUseCase } from '../search-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsInUseCase() {
  const repository = new PrismaGymsRepository()
  const useCase = new SearchGymUseCase(repository)

  return useCase
}
