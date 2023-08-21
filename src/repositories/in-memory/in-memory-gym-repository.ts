import { Gym, Prisma } from '@prisma/client'
import { IGymRepository } from '../gym-repository'
import crypto from 'node:crypto'

export class InMemoryGymRepository implements IGymRepository {
  public items: Gym[] = []

  async findById(gymId: string): Promise<Gym | undefined> {
    return this.items.find((gym) => gym.id === gymId)
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? crypto.randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)
    return gym
  }
}
