class GetEmployeByIdUseCase {
  constructor({ employeRepository }) {
    this._employeRepository = employeRepository;
  }

  async execute(useCaseParams) {
    const { employeId } = useCaseParams;
    const detailEmployes = await this._employeRepository.getEmployeById(employeId);

    return detailEmployes;
  }
}

module.exports = GetEmployeByIdUseCase;
