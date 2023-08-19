import { Prisma } from '@prisma/client'

export class InMemoryUserRepository {
  public users: Prisma.UserCreateInput[] = []
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: (this.users.length + 1).toString(),
      ...data,
    }

    this.users.push(user)
    return user
  }
}
