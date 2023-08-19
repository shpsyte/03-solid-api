import { prisma } from '@/lib/prisma'
import { PrismaUserRepository } from '@/repositories/prisma-user-repository'
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
  constructor(private repository: any) {
    this.repository = repository
  }

  async execute({
    name,
    email,
    password,
  }: RegsiterUseCaseRequest): Promise<
    Omit<Prisma.UserCreateInput, 'password_hash'>
  > {
    const pwdHash = await hash(password, 6)

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      user = await this.repository.create({
        name,
        email,
        password_hash: pwdHash,
      })
    }

    // return user but omit password_hash
    return {
      id: user?.id,
      name: user?.name ?? '',
      email: user?.email ?? '',
      created_at: user?.created_at ?? '',
    }
  }
}
