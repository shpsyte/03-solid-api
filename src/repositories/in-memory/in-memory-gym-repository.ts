import { Gym, Prisma, User } from '@prisma/client'
import { IGymRepository } from '../gym-repository'

export class InMemoryGymRepository implements IGymRepository {
  public items: Gym[] = []

  async findById(gymId: string): Promise<Gym | undefined> {
    return this.items.find((gym) => gym.id === gymId)
  }
}
