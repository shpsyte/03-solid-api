import { it, expect, describe, afterEach, beforeEach, vi } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { SearchGymUseCase } from '@/use-cases/search-gym'

describe('Register User', () => {
  let gymRepository: InMemoryGymRepository
  let sut: SearchGymUseCase

  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new SearchGymUseCase(gymRepository)

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

  it('should be able to fetch gym ', async () => {
    const { gyms } = await sut.execute({
      query: '',
      page: 1,
    })

    expect(gyms).toBeInstanceOf(Array)
  })

  it('should be able to fetch gym with filter ', async () => {
    const { gyms } = await sut.execute({
      query: 'Academia 0',
      page: 1,
    })

    expect(gyms).toEqual([expect.objectContaining({ title: 'Academia 0' })])
  })

  it('should be able to fetch gym with items ', async () => {
    const { gyms } = await sut.execute({
      query: 'Academia',
      page: 1,
    })

    expect(gyms).length(20)

    // get the check in history
  })

  it('should be able to fetch check in history with paginaed item ', async () => {
    const { gyms } = await sut.execute({
      query: 'Academia',
      page: 2,
    })

    expect(gyms).toEqual([
      expect.objectContaining({ id: expect.any(String) }),
      expect.objectContaining({ id: expect.any(String) }),
    ])

    // get the check in history
  })
})
