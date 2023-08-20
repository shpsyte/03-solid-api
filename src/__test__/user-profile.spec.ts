import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile'
import { ApiError } from '@/use-cases/errors/api-error'

describe('Profile User', () => {
  let userRepository: InMemoryRepository
  let sut: GetUserProfileUseCase

  beforeEach(() => {
    userRepository = new InMemoryRepository()
    sut = new GetUserProfileUseCase(userRepository)
  })

  it('should be able to get profile', async () => {
    const user = await userRepository.create({
      name: 'John Doe',
      email: 'john@john.com',
      password_hash: await hash('123456', 6),
    })

    await expect(
      sut.execute({
        userId: user.id,
      }),
    ).resolves.toEqual({
      user: {
        id: user.id,
      },
    })
  })

  it('should be able to not get a profile if user does not exists', async () => {
    await expect(
      sut.execute({
        userId: 'any id that does not exists',
      }),
    ).rejects.toBeInstanceOf(ApiError)
  })
})
