const DetailEmploye = require('../../../Domains/employes/entities/DetailEmploye');
const EmployeRepository = require('../../../Domains/employes/EmployeRepository');
const GetEmployeByIdUseCase = require('../GetEmployeByIdUseCase');

describe('GetEmployeByIdUseCase', () => {
  it('should orchestrate the getEmployeById action correctly', async () => {
    // Arrange
    const useCaseParams = {
      employeId: 'employe-123',
    };

    const expectedDetailEmployes = new DetailEmploye({
      id: 'employe-123',
      fullname: 'karyawan A',
      jenisKelamin: 'L',
      username: 'dicoding',
    });

    /** creating dependency of use case */
    const mockEmployeRepository = new EmployeRepository();

    /** mocking needed function */
    mockEmployeRepository.getEmployeById = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedDetailEmployes));

    /** creating use case instance */
    const getEmployeByIdUseCase = new GetEmployeByIdUseCase({
      employeRepository: mockEmployeRepository,
    });

    // Action
    const allEmployes = await getEmployeByIdUseCase.execute(useCaseParams);

    // Assert
    expect(allEmployes).toEqual(expectedDetailEmployes);
    expect(mockEmployeRepository.getEmployeById).toBeCalledWith(useCaseParams.employeId);
  });
});
