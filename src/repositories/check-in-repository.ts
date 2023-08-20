import { Prisma, CheckIn } from '@prisma/client'

export interface ICheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
