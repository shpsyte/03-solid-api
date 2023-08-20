import { it, expect, describe, beforeEach } from 'vitest'
import { CheckInUserCase } from '@/use-cases/check-in'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository'

describe('Register User', () => {
  let checkInRepository: InMemoryCheckInRepository
  let sut: CheckInUserCase

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new CheckInUserCase(checkInRepository)
  })

  it('should be able to create a check in ', async () => {
    const input = {
      gymId: 'gym-01',
      userId: 'user-01',
    }

    const { checkIn } = await sut.execute(input)

    expect(checkIn).toStrictEqual({
      id: expect.any(String),
      user_id: 'user-01',
      gym_id: 'gym-01',
      validated_at: null,
      created_at: expect.any(Date),
    })
  })

  it('should be able to create a check in with a validate date ', async () => {
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
})
