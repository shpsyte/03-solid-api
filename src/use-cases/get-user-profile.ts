import { IUserRepository } from '@/repositories/users-repository'
import { ApiError } from './errors/api-error'
import { User } from '@prisma/client'

type GetUserProfileRequest = {
  userId: string
}

type GetUserProfileResponse = {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private repository: IUserRepository) {}

  async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse | null> {
    // buscar o usuario pelo id
    const user = await this.repository.findById(userId)

    if (!user) {
      throw new ApiError('User not found')
    }

    return {
      user,
    }
  }
}

/**
 * Comeca com o caso de uso, para depois ir para o repositorio
 * por que agente ja consegue testar e ver se o caso de uso esta funcionando
 * e depois ir para o repositorio
 *
 */
