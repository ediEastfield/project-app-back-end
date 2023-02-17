const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const EmployesTableTestHelper = require('../../../../tests/EmployesTableTestHelper');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const ServersTestHelper = require('../../../../tests/ServersTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/employes endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await EmployesTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
  });

  describe('when POST /employes', () => {
    it('should response 201 and presisted employe', async () => {
      // Arrange
      const requestPayload = {
        fullname: 'karyawan',
        jenisKelamin: 'L',
      };

      const server = await createServer(container);

      const { accessToken } = await ServersTestHelper.getAccessTokenAndUserIdHelper({ server });

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/employes',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data).toBeDefined();
      expect(responseJson.data.addedEmploye).toBeDefined();
      expect(responseJson.data.addedEmploye.id).toBeDefined();
      expect(responseJson.data.addedEmploye.fullname).toBeDefined();
      expect(responseJson.data.addedEmploye.owner).toBeDefined();
    });

    it('should response with 401 no access token is provided', async () => {
      // Arrange
      const requestPayload = {
        fullname: 'karyawan',
        jenisKelamin: 'L',
      };

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/employes',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Missing authentication');
    });

    it('should response with 400 when payload not contain needed property', async () => {
      // Arrange
      const requestPayload = {
        fullname: 'karyawan',
      };

      const server = await createServer(container);

      const { accessToken } = await ServersTestHelper.getAccessTokenAndUserIdHelper({ server });

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/employes',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat karyawan baru karena properti yang dibutuhkan tidak ada');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const requestPayload = {
        fullname: 123,
        jenisKelamin: true,
      };

      const server = await createServer(container);

      const { accessToken } = await ServersTestHelper.getAccessTokenAndUserIdHelper({ server });

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/employes',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat karyawan baru karena tipe data tidak sesuai');
    });
  });

  describe('when GET /employes/{employeId}', () => {
    it('should response with 200 detail employe', async () => {
      // Arrange
      const server = await createServer(container);

      const employeId = 'employe-123';
      await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding' });
      await EmployesTableTestHelper.addEmployes({ id: employeId, owner: 'user-123' });

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/employes/${employeId}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data).toBeDefined();
      expect(responseJson.data.employe).toBeDefined();
    });
  });

  describe('when GET /employes', () => {
    it('should response with 200 all employe', async () => {
      // Arrange
      const server = await createServer(container);

      await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding' });
      await EmployesTableTestHelper.addEmployes({ id: 'employe-123', owner: 'user-123' });

      // Action
      const response = await server.inject({
        method: 'GET',
        url: '/employes',
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data).toBeDefined();
    });
  });
});
