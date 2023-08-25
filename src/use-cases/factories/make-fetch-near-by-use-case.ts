import { FetchNearByGymsUseCase } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchNearByGymsInUseCase() {
  const repository = new PrismaGymsRepository()
  const useCase = new FetchNearByGymsUseCase(repository)

  return useCase
}
