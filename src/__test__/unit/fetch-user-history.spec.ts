import { it, expect, describe, afterEach, beforeEach, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { FetchUserCheckInsUseCase } from '@/use-cases/fetch-user-checkin-history'

describe('Register User', () => {
  let checkInRepository: InMemoryCheckInRepository
  let sut: FetchUserCheckInsUseCase

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new FetchUserCheckInsUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to fetch check in history', async () => {
    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).length(0)
  })

  it('should be able to fetch check in history with items ', async () => {
    // create check in
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

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).not.length(0)
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toBeInstanceOf(Array)

    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: expect.any(String) }),
      expect.objectContaining({ gym_id: expect.any(String) }),
    ])

    // get the check in history
  })

  it('should be able to fetch check in history with paginaed item ', async () => {
    // create check in
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
        created_at: new Date(),
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: expect.any(String) }),
      expect.objectContaining({ gym_id: expect.any(String) }),
    ])

    // get the check in history
  })
})
