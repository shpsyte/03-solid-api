import { CheckIn } from '@prisma/client'
import { ICheckInRepository } from '@/repositories/check-in-repository'
import { IGymRepository } from '@/repositories/gym-repository'
import { ApiError } from './errors/api-error'

type CheckInCaseRequest = {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

type CheckInCaseResponse = {
  checkIn: CheckIn
}

export class CheckInUserCase {
  constructor(
    private checkInRepository: ICheckInRepository,
    private gymRepository: IGymRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInCaseRequest): Promise<CheckInCaseResponse> {
    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      throw new ApiError('Gym not found')
    }

    // caclulate distance between user and gym

    // if distance is greater than 100 meters
    // throw new ApiError('User is not close enough to check in')

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
      validated_at: new Date(),
    })

    return {
      checkIn,
    }
  }
}
