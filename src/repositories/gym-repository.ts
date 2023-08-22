import { Prisma, Gym } from '@prisma/client'

export interface IGymRepository {
  findById(gymId: string): Promise<Gym | undefined | null>
  findManyNearby(parms: FindManyNearByParms): Promise<Gym[]>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
