import { Gym } from '@prisma/client'
import { IGymRepository } from '@/repositories/gym-repository'

type SearchGymUseCaseRequest = {
  query: string
  page: number
}

type SearchGymUseCaseResponse = {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private repository: IGymRepository) {}

  async execute({
    query,
    page,
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.repository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
