import { CheckIn } from '@prisma/client'
import { ICheckInRepository } from '@/repositories/check-in-repository'

type FetchUserCheckInsHistoryRequest = {
  userId: string
  page: number
}

type FetchUserCheckInReponse = {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsUseCase {
  constructor(private checkInRepository: ICheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInReponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return {
      checkIns,
    }
  }
}
