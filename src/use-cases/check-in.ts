import { CheckIn } from '@prisma/client'
import { ICheckInRepository } from '@/repositories/check-in-repository'
import { IGymRepository } from '@/repositories/gym-repository'
import { ApiError } from './errors/api-error'
import { getDistanceBetweenTwoCoordinates } from '@/utils/get-distance-between-two-coordenates'

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
    const distance = getDistanceBetweenTwoCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude?.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const maxDistanceInKm = 0.1

    if (distance > maxDistanceInKm) {
      throw new ApiError('User is too far from gym')
    }

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
