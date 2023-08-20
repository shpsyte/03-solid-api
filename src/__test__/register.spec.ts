import { it, expect, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from '@/use-cases/register'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'

describe('Register User', () => {
  let userRepository: InMemoryRepository
  let sut: RegisterUseCase

  beforeEach(() => {
    userRepository = new InMemoryRepository()
    sut = new RegisterUseCase(userRepository)
  })

  it('should be able to create a user', async () => {
    await expect(
      sut.execute({
        name: 'John Doe',
        email: 'joh@john.com',
        password: '123456',
      }),
    ).resolves.toBeTruthy()
  })

  it('should hash user password upon registration', async () => {
    const user = await sut.execute({
      name: 'John Doe',
      email: 'joh@john.com',
      password: '123456',
    })

    const output = await compare('123456', user.user.password_hash)

    expect(output).toBe(true)
  })

  it('should not able to create same email', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'joh@john.com',
      password: '123456',
    })

    await expect(
      sut.execute({
        name: 'John Doe',
        email: 'joh@john.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
