import { ICheckInRepository } from '@/repositories/check-in-repository'

type GetUserMetricsRequest = {
  userId: string
}

type GetUserMetricsReponse = {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: ICheckInRepository) {}

  async execute({
    userId,
  }: GetUserMetricsRequest): Promise<GetUserMetricsReponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
