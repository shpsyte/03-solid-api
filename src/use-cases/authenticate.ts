import { IUserRepository } from '@/repositories/users-repository'
import { InvalidCredentialError } from './errors/invalid-credential-error'
import { compare } from 'bcryptjs'

type AuthenticateUseCaseRequest = {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = {
  user: {
    id: string
    name: string
  }
}

export class AuthenticateUseCase {
  constructor(private repository: IUserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    // buscar o usuario pelo email
    const user = await this.repository.findByEmail(email)
    const doesPasswordMatch = await compare(password, user?.password_hash || '')

    if (!user || !doesPasswordMatch) {
      throw new InvalidCredentialError()
    }

    // validar o usario, comparando a senha que ele digitou com a senha que esta no banco de dados

    return {
      user: {
        id: user.id,
        name: user.name,
      },
    }
  }
}

/**
 * Comeca com o caso de uso, para depois ir para o repositorio
 * por que agente ja consegue testar e ver se o caso de uso esta funcionando
 * e depois ir para o repositorio
 *
 */
