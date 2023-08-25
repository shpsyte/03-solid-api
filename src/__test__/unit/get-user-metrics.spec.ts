import { it, expect, describe, afterEach, beforeEach, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { GetUserMetricsUseCase } from '@/use-cases/get-user-metric'

describe('Get User Metrics', () => {
  let checkInRepository: InMemoryCheckInRepository
  let sut: GetUserMetricsUseCase

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to count form metrisc ', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
      created_at: new Date(),
    })
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
      created_at: new Date(),
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    console.log(checkInsCount)

    expect(checkInsCount).toBe(2)
  })
})
