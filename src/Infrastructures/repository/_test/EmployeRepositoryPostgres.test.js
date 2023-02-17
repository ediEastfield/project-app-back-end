const EmployesTableTestHelper = require('../../../../tests/EmployesTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NewEmploye = require('../../../Domains/employes/entities/NewEmploye');
const AddedEmploye = require('../../../Domains/employes/entities/AddedEmploye');
const pool = require('../../database/postgres/pool');
const EmployeRepositoryPostgres = require('../EmployeRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('EmployeRepositoryPostgres', () => {
  afterEach(async () => {
    await EmployesTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addEmploye function', () => {
    it('should create new employe and return added employe correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia',
      });

      const fakeEmployeIdGenerator = (x = 10) => '123';

      const newEmploye = new NewEmploye({
        fullname: 'karyawan',
        jenisKelamin: 'L',
        owner: 'user-123',
      });

      const employeRepositoryPostgres = new EmployeRepositoryPostgres(pool, fakeEmployeIdGenerator);

      // Action
      const addedEmploye = await employeRepositoryPostgres.addEmploye(newEmploye);

      // Assert
      const employes = await EmployesTableTestHelper.findEmployesById(addedEmploye.id);
      expect(addedEmploye).toStrictEqual(new AddedEmploye({
        id: `employe-${fakeEmployeIdGenerator()}`,
        fullname: 'karyawan',
        owner: 'user-123',
      }));
      expect(employes).toBeDefined();
    });
  });

  describe('getEmployeById function', () => {
    it('should return NotFoundError when employe is not found', async () => {
      // Arrange
      const employeRepositoryPostgres = new EmployeRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await EmployesTableTestHelper.addEmployes({ id: 'employe-123', owner: 'user-123' });

      // Action and Assert
      await expect(employeRepositoryPostgres.getEmployeById('employe-x'))
        .rejects
        .toThrowError(NotFoundError);
    });

    it('should return employe when is found', async () => {
      // Arrange
      const newEmploye = {
        id: 'employe-123',
        fullname: 'karyawan',
        jenisKelamin: 'L',
        username: 'dicoding',
      };

      const expectedEmploye = {
        id: 'employe-123',
        fullname: 'karyawan',
        jenisKelamin: 'L',
        username: 'dicoding',
      };

      const employeRepositoryPostgres = new EmployeRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await EmployesTableTestHelper.addEmployes(newEmploye);

      // Action
      const getEmploye = await employeRepositoryPostgres.getEmployeById('employe-123');

      // Assert
      expect(getEmploye).toStrictEqual(expectedEmploye);
    });
  });

  describe('getAllEmploye function', () => {
    it('should return all employe', async () => {
      // Arrange
      const newEmploye = {
        id: 'employe-123',
        fullname: 'karyawan',
        jenisKelamin: 'L',
        username: 'dicoding',
      };

      const expectedEmploye = [{
        id: 'employe-123',
        fullname: 'karyawan',
        username: 'dicoding',
      }];

      const employeRepositoryPostgres = new EmployeRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await EmployesTableTestHelper.addEmployes(newEmploye);

      // Action
      const getAllEmploye = await employeRepositoryPostgres.getAllEmploye();

      // Assert
      expect(getAllEmploye).toStrictEqual(expectedEmploye);
    });
  });
});
