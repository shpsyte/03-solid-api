import { CheckIn, Prisma } from '@prisma/client'
import { ICheckInRepository } from '../check-in-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements ICheckInRepository {
  findById(id: string): Promise<CheckIn | null> {
    throw new Error('Method not implemented.')
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({ data })
    return checkIn
  }

  findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = prisma.checkIn.findMany({
      where: {
        id: userId,
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return checkIns
  }

  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = prisma.checkIn.findFirst({
      where: {
        id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkIn
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        id: userId,
      },
    })

    return count
  }

  async save(data: CheckIn): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.update({
      where: { id: data.id },
      data: { ...data },
    })
    return checkIn
  }
}
