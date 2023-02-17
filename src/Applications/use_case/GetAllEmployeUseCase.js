class GetAllEmployeUseCase {
  constructor({ employeRepository }) {
    this._employeRepository = employeRepository;
  }

  async execute() {
    const allEmployes = await this._employeRepository.getAllEmploye();

    return allEmployes;
  }
}

module.exports = GetAllEmployeUseCase;
