const AllEmploye = require('../../../Domains/employes/entities/AllEmploye');
const EmployeRepository = require('../../../Domains/employes/EmployeRepository');
const GetAllEmployeUseCase = require('../GetAllEmployeUseCase');

describe('GetAllEmployeUseCase', () => {
  it('should orchestrate the getAllEmploye action correctly', async () => {
    // Arrange
    const expectedEmployes = [
      new AllEmploye({
        id: 'employe-123',
        fullname: 'karyawan A',
        jenisKelamin: 'L',
        username: 'dicoding',
      }),
      new AllEmploye({
        id: 'employe-456',
        fullname: 'karyawan',
        jenisKelamin: 'L',
        username: 'dicoding',
      }),
    ];

    /** creating dependency of use case */
    const mockEmployeRepository = new EmployeRepository();

    /** mocking needed function */
    mockEmployeRepository.getAllEmploye = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedEmployes));

    /** creating use case instance */
    const getAllEmployeUseCase = new GetAllEmployeUseCase({
      employeRepository: mockEmployeRepository,
    });

    // Action
    const allEmployes = await getAllEmployeUseCase.execute();

    // Assert
    expect(allEmployes).toEqual(expectedEmployes);
    expect(mockEmployeRepository.getAllEmploye).toBeCalledWith();
  });
});
