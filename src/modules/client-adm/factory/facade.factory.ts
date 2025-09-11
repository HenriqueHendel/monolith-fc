import { ClientAdmFacade } from '../facade/client-adm.facade'
import { ClientAdmFacadeInterface } from '../facade/facade.interface'
import { ClientAdmRepository } from '../repository/client-adm.repository'
import { AddClientUseCase } from '../usecase/add-client/add-client.usecase'
import { FindClientUseCase } from '../usecase/find-client/find-client.usecase'

export class ClientAdmFacadeFactory {
  static create(): ClientAdmFacadeInterface {
    const clientAdmRepository = new ClientAdmRepository()
    const addClientAdmUseCase = new AddClientUseCase(clientAdmRepository)
    const findClientAdmUseCase = new FindClientUseCase(clientAdmRepository)

    return new ClientAdmFacade({
      addClientUseCase: addClientAdmUseCase,
      findClientUseCase: findClientAdmUseCase,
    })
  }
}
