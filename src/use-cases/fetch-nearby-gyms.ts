import { Gym } from '@prisma/client'
import { IGymRepository } from '@/repositories/gym-repository'

type FetchNearByGymsUseCaseRequest = {
  userLatitude: number
  userLongitude: number
}

type FetchNearByGymsUseCaseResponse = {
  gyms: Gym[]
}

export class FetchNearByGymsUseCase {
  constructor(private repository: IGymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearByGymsUseCaseRequest): Promise<FetchNearByGymsUseCaseResponse> {
    const gyms = await this.repository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
