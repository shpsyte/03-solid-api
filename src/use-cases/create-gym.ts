import { Gym } from '@prisma/client'
import { IGymRepository } from '@/repositories/gym-repository'

type CreateGymUseCaseRequest = {
  id?: string
  title: string
  description?: string | null
  phone: string | null
  latitude: number
  longitude: number
}

type CreateGymUseCaseResponse = {
  gym: Gym
}

export class RegisterGymUseCase {
  constructor(private repository: IGymRepository) {}

  async execute({
    latitude,
    longitude,
    title,
    description,
    phone,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.repository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
