import { FetchUserCheckInsUseCase } from '../fetch-user-checkin-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFatchUserCheckInHistoryUseCase() {
  const repository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsUseCase(repository)

  return useCase
}
