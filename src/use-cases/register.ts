import { IUserRepository } from '@/repositories/users-repository'
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

type RegisterUseCaseResponse = {
  user: {
    id: string
    name: string
    email: string
    password_hash: string
  }
}
export class RegisterUseCase {
  constructor(private repository: IUserRepository) {
    this.repository = repository
  }

  async execute({
    name,
    email,
    password,
  }: RegsiterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const pwdHash = await hash(password, 6)

    const userExists = await this.repository.findByEmail(email)

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.repository.create({
      name,
      email,
      password_hash: pwdHash,
    })

    return {
      user,
    }
  }
}
