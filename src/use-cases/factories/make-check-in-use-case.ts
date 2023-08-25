import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUserCase } from '../check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeCheckInUseCase() {
  const repository = new PrismaCheckInsRepository()
  const gymRepository = new PrismaGymsRepository()
  const useCase = new CheckInUserCase(repository, gymRepository)

  return useCase
}
