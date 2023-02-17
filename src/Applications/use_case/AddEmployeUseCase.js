const NewEmploye = require('../../Domains/employes/entities/NewEmploye');

class AddEmployeUseCase {
  constructor({ employeRepository, authenticationTokenManager }) {
    this._employeRepository = employeRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCasePayload, headerAuthorization) {
    const accessToken = await this._authenticationTokenManager
      .getTokenFromHeader(headerAuthorization);
    await this._authenticationTokenManager.verifyAccessToken(accessToken);
    const { id: owner } = await this._authenticationTokenManager.decodePayload(accessToken);
    const newEmploye = new NewEmploye({ ...useCasePayload, owner });
    return this._employeRepository.addEmploye(newEmploye);
  }
}

module.exports = AddEmployeUseCase;
