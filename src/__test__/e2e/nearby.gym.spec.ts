import request from 'supertest'
import { app } from '@/app'
import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import { createAndAuthUser } from '..'

describe('Authenticate (NearBy Gym)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to search a gym ', async () => {
    const { token } = await createAndAuthUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript',
        latitude: -23.56168,
        longitude: -46.62543,
        description: 'Academia do Zé',
        phone: '11999999999',
      })
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'typescript gym',
        latitude: -2.16168,
        longitude: -4.12543,
        description: 'Academia do Zé',
        phone: '11999999999',
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({ latitude: -23.56168, longitude: -46.62543 })
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript',
      }),
    ])
  })
})
