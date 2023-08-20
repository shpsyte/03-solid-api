import { it, expect, test, describe } from 'vitest'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-repository'
import { InvalidCredentialError } from '@/use-cases/errors/invalid-credential-error'
import { hash } from 'bcryptjs'
test('just a test => ', () => {
  expect(1 + 1).toBe(2) //
})

describe('Auhtenticate User', () => {
  it('should be able to authenticate a user', async () => {
    const userRepository = new InMemoryRepository()
    const sut = new AuthenticateUseCase(userRepository)

    await userRepository.create({
      name: 'John Doe',
      email: 'john@john.com',
      password_hash: await hash('123456', 6),
    })

    const response = sut.execute({
      email: 'john@john.com',
      password: '123456',
    })

    await expect(response).resolves.toEqual({
      user: { id: expect.any(String), name: 'John Doe' },
    })
  })
  it('should be able to not auth with wrong email', async () => {
    const userRepository = new InMemoryRepository()
    const sut = new AuthenticateUseCase(userRepository)

    const response = sut.execute({
      email: 'john@john.com',
      password: '123456',
    })

    await expect(response).rejects.toBeInstanceOf(InvalidCredentialError)
  })
  it('should be able to not auth with wrong pwd', async () => {
    const userRepository = new InMemoryRepository()
    const sut = new AuthenticateUseCase(userRepository)

    await userRepository.create({
      name: 'John Doe',
      email: 'john@john.com',
      password_hash: await hash('123456', 6),
    })

    const response = sut.execute({
      email: 'john@john.com',
      password: '1234',
    })

    await expect(response).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
