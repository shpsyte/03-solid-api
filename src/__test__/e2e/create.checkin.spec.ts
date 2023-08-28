import request from 'supertest'
import { app } from '@/app'
import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import { createAndAuthUser } from '..'
import { prisma } from '@/lib/prisma'

describe('Authenticate (Create Gym)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to create a checkin ', async () => {
    const { token } = await createAndAuthUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Javascript Gym',
        latitude: -23.56168,
        longitude: -46.62543,
        description: 'Javascript Gym',
        phone: '11999999999',
      },
    })

    const response = await request(app.server)
      .post(`/check-ins/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -23.56168,
        longitude: -46.62543,
      })

    expect(response.status).toBe(200)
  })
})
