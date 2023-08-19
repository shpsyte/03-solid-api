import { it, expect, test, describe } from 'vitest'
import { RegisterUseCase } from '@/use-cases/register'
import { compare } from 'bcryptjs'
test('just a test => ', () => {
  expect(1 + 1).toBe(2) //
})

describe('Register User', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      findByEmail: async (_email) => {
        return null
      },
      async create(data) {
        return {
          id: 'any_id',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const user = await registerUseCase.execute({
      name: 'John Doe',
      email: 'joh@john.com',
      password: '123456',
    })

    const output = await compare('123456', user.user.password_hash)

    expect(output).toBe(true)
  })
})
