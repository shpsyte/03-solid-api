import { CheckIn, Prisma } from '@prisma/client'
import { ICheckInRepository } from '../check-in-repository'
import crypto from 'node:crypto'

export class InMemoryCheckInRepository implements ICheckInRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: crypto.randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)
    return checkIn
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const checkInSameday = this.items.find(
      (checkIn) => checkIn.user_id === userId && checkIn.created_at === date,
    )

    if (!checkInSameday) {
      return null
    }

    return checkInSameday
  }
}
