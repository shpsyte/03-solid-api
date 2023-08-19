import { IUserRepository } from '@/repositories/users-repository'
import { Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

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
    const pwdHash = await hassh(password, 6)

    const user = await this.repository.findByEmail(email)

    if (user) {
      throw new UserAlreadyExistsError()
    }

    return await this.repository.create({
      name,
      email,
      password_hash: pwdHash,
    })
  }
}
