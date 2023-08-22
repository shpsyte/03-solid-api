import { Prisma, Gym } from '@prisma/client'

export interface IGymRepository {
  findById(gymId: string): Promise<Gym | undefined | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
