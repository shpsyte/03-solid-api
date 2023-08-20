import { it, expect, test, describe } from 'vitest'
import { RegisterUseCase } from '@/use-cases/register'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
test('just a test => ', () => {
  expect(1 + 1).toBe(2) //
})

describe('Register User', () => {
  it('should be able to create a user', async () => {
    const userRepository = new InMemoryRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    const resp = await registerUseCase.execute({
      name: 'John Doe',
      email: 'joh@john.com',
      password: '123456',
    })

    const output = {
      user: {
        id: expect.any(String),
        name: 'John Doe',
        email: 'joh@john.com',
        password_hash: expect.any(String),
        created_at: expect.any(Date),
      },
    }

    expect(resp).toEqual(output)

    console.log(resp)
  })

  it('should hash user password upon registration', async () => {
    const userRepository = new InMemoryRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    const user = await registerUseCase.execute({
      name: 'John Doe',
      email: 'joh@john.com',
      password: '123456',
    })

    const output = await compare('123456', user.user.password_hash)

    expect(output).toBe(true)
  })

  it('should not able to create same email', async () => {
    const userRepository = new InMemoryRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    await registerUseCase.execute({
      name: 'John Doe',
      email: 'joh@john.com',
      password: '123456',
    })

    const resp = registerUseCase.execute({
      name: 'John Doe',
      email: 'joh@john.com',
      password: '123456',
    })

    await expect(() => resp).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
