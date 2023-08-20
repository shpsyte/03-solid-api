import { CheckIn, Prisma } from '@prisma/client'
import { ICheckInRepository } from '../check-in-repository'
import crypto from 'node:crypto'

export class InMemoryCheckInRepository implements ICheckInRepository {
  public checkin: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: crypto.randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.checkin.push(checkIn)
    return checkIn
  }
}
