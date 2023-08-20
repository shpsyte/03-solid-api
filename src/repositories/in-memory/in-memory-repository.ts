import { Prisma, User } from '@prisma/client'
import { IUserRepository } from '../users-repository'
import crypto from 'node:crypto'

export class InMemoryRepository implements IUserRepository {
  public users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)
    return user || null
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.users.push(user)
    return user
  }
}
