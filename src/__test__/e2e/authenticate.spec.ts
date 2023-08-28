import request from 'supertest'
import { app } from '@/app'
import { expect, describe, it, beforeAll, afterAll } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to autencticate new user', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.status).toBe(200)

    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.any(Object),
      }),
    )
  })
})
