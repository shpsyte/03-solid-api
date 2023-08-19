import { prisma } from '@/lib/prisma'
import { IUserRepository } from '@/repositories/users-repository'
import { Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'

type RegsiterUseCaseRequest = {
  name: string
  email: string
  password: string
}

// export async function registerUseCase(repository) {
//   return async ({ name, email, password }: RegsiterUseCaseRequest) => {
//     repository.create({
//       name,
//       email,
//       password_hash: await hash(password, 6),
//     })
//   }
// }

export class RegisterUseCase {
  constructor(private repository: IUserRepository) {
    this.repository = repository
  }

  async execute({
    name,
    email,
    password,
  }: RegsiterUseCaseRequest): Promise<
    Pick<Prisma.UserCreateInput, 'id' | 'email'>
  > {
    const pwdHash = await hash(password, 6)

    let user = await this.repository.findByEmail(email)

    if (!user) {
      user = await this.repository.create({
        name,
        email,
        password_hash: pwdHash,
      })
    }

    // delete the property password_hash from the user object
    // to not return it in the response

    return {
      email: user.email,
      id: user.id,
    }
  }
}
