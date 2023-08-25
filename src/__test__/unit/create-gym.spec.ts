import { it, expect, describe, afterEach, beforeEach, vi } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { RegisterGymUseCase } from '@/use-cases/create-gym'

let repository: InMemoryGymRepository
let sut: RegisterGymUseCase

describe('Gym ', () => {
  beforeEach(() => {
    repository = new InMemoryGymRepository()
    sut = new RegisterGymUseCase(repository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to create a gym ', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0))

    const { gym } = await sut.execute({
      id: 'gym-01',
      title: 'Academia 01',
      description: 'Academia 01',
      phone: '123456789',
      latitude: 49.2168449,
      longitude: -122.9386039,
    })

    expect(gym).toMatchObject({
      id: expect.any(String),
      title: 'Academia 01',
      description: 'Academia 01',
      phone: '123456789',
      created_at: expect.any(Date),
    })
  })
})
