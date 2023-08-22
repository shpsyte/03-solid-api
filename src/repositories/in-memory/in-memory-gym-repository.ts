import { Gym, Prisma } from '@prisma/client'
import { IGymRepository } from '../gym-repository'
import crypto from 'node:crypto'
import { getDistanceBetweenTwoCoordinates } from '@/utils/get-distance-between-two-coordenates'

export class InMemoryGymRepository implements IGymRepository {
  public items: Gym[] = []

  async findManyNearby(parms: FindManyNearByParms): Promise<Gym[]> {
    return this.items.filter((gym) => {
      const distance = getDistanceBetweenTwoCoordinates(
        {
          latitude: parms.latitude,
          longitude: parms.longitude,
        },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

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
