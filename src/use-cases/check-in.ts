import { CheckIn } from '@prisma/client'
import { ICheckInRepository } from '@/repositories/check-in-repository'

type CheckInCaseRequest = {
  userId: string
  gymId: string
  validated_at?: Date
}

type CheckInCaseResponse = {
  checkIn: CheckIn
}

export class CheckInUserCase {
  constructor(private checkInRepository: ICheckInRepository) {}

  async execute({
    userId,
    gymId,
    validated_at,
  }: CheckInCaseRequest): Promise<CheckInCaseResponse> {
    const checkInSameday = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInSameday) {
      throw new Error('User already checked in today')
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
      validated_at,
    })

    return {
      checkIn,
    }
  }
}
