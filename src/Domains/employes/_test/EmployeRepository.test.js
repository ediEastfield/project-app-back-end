const EmployeRepository = require('../EmployeRepository');

describe('EmployeRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const employeRepository = new EmployeRepository();

    // Action and Assert
    await expect(employeRepository.addEmploye({})).rejects.toThrowError('EMPLOYE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(employeRepository.getEmployeById('')).rejects.toThrowError('EMPLOYE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(employeRepository.getAllEmploye()).rejects.toThrowError('EMPLOYE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
