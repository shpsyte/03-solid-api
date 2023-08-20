import { it, expect, describe, afterEach, beforeEach, vi } from 'vitest'
import { CheckInUserCase } from '@/use-cases/check-in'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository'

describe('Register User', () => {
  let checkInRepository: InMemoryCheckInRepository
  let sut: CheckInUserCase

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new CheckInUserCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to create a check in ', async () => {
    const input = {
      gymId: 'gym-01',
      userId: 'user-01',
    }

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0))

    const { checkIn } = await sut.execute(input)
    console.log(checkIn)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to create a check in with a validate date ', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0))

    const input = {
      gymId: 'gym-01',
      userId: 'user-01',
      validated_at: new Date(),
    }

    const { checkIn } = await sut.execute(input)

    expect(checkIn).toStrictEqual({
      id: expect.any(String),
      user_id: 'user-01',
      gym_id: 'gym-01',
      validated_at: expect.any(Date),
      created_at: expect.any(Date),
    })
  })

  // red, green, refactor
  /**
   * red: write a test that fails
   * green: write the minimum amount of code to make the test pass
   * refactor: refactor the code
   */
  it('should not be able to check in twice a day ', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0))
    // first check in
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    // second check in
    await expect(
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check in twice a day but in diff day ', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0))
    // first check in
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0))

    // second check in
    await expect(
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      }),
    ).resolves.toBeTruthy()
  })
})
