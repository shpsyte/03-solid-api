import { it, expect, describe, afterEach, beforeEach, vi } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { FetchNearByGymsUseCase } from '@/use-cases/fetch-nearby-gyms'

describe('Register User', () => {
  let gymRepository: InMemoryGymRepository
  let sut: FetchNearByGymsUseCase

  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new FetchNearByGymsUseCase(gymRepository)

    for (let i = 0; i < 22; i++) {
      gymRepository.create({
        id: `gym-${i}`,
        title: `Academia ${i}`,
        description: `Academia ${i}`,
        phone: '123456789',
        latitude: 49.2168449,
        longitude: -122.9386039,
      })
    }

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.only('should be able to fetch gym ', async () => {
    const { gyms } = await sut.execute({
      userLatitude: 49.2168449,
      userLongitude: -122.9386039,
    })

    expect(gyms).length(22)
  })

  it('should be able to fetch gym outside of range ', async () => {
    const { gyms } = await sut.execute({
      userLatitude: 1,
      userLongitude: -1,
    })

    expect(gyms).toEqual([])
  })
})
