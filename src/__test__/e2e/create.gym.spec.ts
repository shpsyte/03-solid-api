import request from 'supertest'
import { app } from '@/app'
import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import { createAndAuthUser } from '..'

describe('Authenticate (Create Gym)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to create a gym ', async () => {
    const { token } = await createAndAuthUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Academia do Zé',
        latitude: -23.56168,
        longitude: -46.62543,
        description: 'Academia do Zé',
        phone: '11999999999',
      })

    expect(response.status).toBe(200)
  })
})
