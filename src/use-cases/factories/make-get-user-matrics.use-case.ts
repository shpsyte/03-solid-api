import { GetUserMetricsUseCase } from '../get-user-metric'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeUserGetUserMatricsUseCase() {
  const repository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(repository)

  return useCase
}
