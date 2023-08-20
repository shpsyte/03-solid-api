import { Prisma, Gym } from '@prisma/client'

export interface IGymRepository {
  findById(gymId: string): Promise<Gym | undefined | null>
}
