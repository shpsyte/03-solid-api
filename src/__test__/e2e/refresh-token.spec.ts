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

  it('should be able to refresh token', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const authResponseCookie = authResponse.get('set-cookie')

    const tokenResponse = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', authResponseCookie)
      .send()

    expect(tokenResponse.status).toBe(200)

    expect(tokenResponse.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    )
  })
})
