import { Gym, Prisma } from '@prisma/client'
import { IGymRepository } from '../gym-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements IGymRepository {
  async findById(gymId: string): Promise<Gym | null | undefined> {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    })

    return gym
  }

  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearByParms): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT *
        FROM gyms
       WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
       ORDER BY title
      `

    return gyms
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return gyms
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({ data })

    return gym
  }
}
