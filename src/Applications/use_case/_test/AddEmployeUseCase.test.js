const NewEmploye = require('../../../Domains/employes/entities/NewEmploye');
const AddedEmploye = require('../../../Domains/employes/entities/AddedEmploye');
const EmployeRepository = require('../../../Domains/employes/EmployeRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const AddEmployeUseCase = require('../AddEmployeUseCase');

describe('AddEmployeUseCase', () => {
  it('should orchestrating the add employe action correctly', async () => {
    // Arrange
    const useCasePayload = {
      fullname: 'karyawan',
      jenisKelamin: 'L',
    };

    const headerAuthorization = 'accessToken';

    const expectedAddedEmploye = new AddedEmploye({
      id: 'employe-123',
      fullname: 'karyawan',
      owner: 'user-123',
    });

    const accessToken = 'accessToken';

    /** creating dependency of use case */
    const mockEmployeRepository = new EmployeRepository();
    const mockAthenticationTokenManager = new AuthenticationTokenManager();

    /** mocking needed function */
    mockEmployeRepository.addEmploye = jest.fn()
      .mockImplementation(() => Promise.resolve(
        expectedAddedEmploye,
      ));

    mockAthenticationTokenManager.verifyAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAthenticationTokenManager.getTokenFromHeader = jest.fn()
      .mockImplementation(() => Promise.resolve(accessToken));
    mockAthenticationTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve({ username: 'dicoding', id: expectedAddedEmploye.owner }));

    /** creating use case instance */
    const addEmployeUseCase = new AddEmployeUseCase({
      employeRepository: mockEmployeRepository,
      authenticationTokenManager: mockAthenticationTokenManager,
    });

    // Action
    const addedEmploye = await addEmployeUseCase.execute(useCasePayload, headerAuthorization);

    // Assert
    expect(mockAthenticationTokenManager.getTokenFromHeader).toBeCalledWith(headerAuthorization);
    expect(mockAthenticationTokenManager.verifyAccessToken()).resolves.toBeUndefined();
    expect(mockAthenticationTokenManager.decodePayload).toBeCalledWith(accessToken);
    expect(mockEmployeRepository.addEmploye).toBeCalledWith(new NewEmploye({
      fullname: useCasePayload.fullname,
      jenisKelamin: useCasePayload.jenisKelamin,
      owner: expectedAddedEmploye.owner,
    }));
  });
});
