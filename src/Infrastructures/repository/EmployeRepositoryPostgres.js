const EmployeRepository = require('../../Domains/employes/EmployeRepository');
const AddedEmploye = require('../../Domains/employes/entities/AddedEmploye');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const { mapEmployeDBToModel } = require('../../utils');

class EmployeRepositoryPostgres extends EmployeRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addEmploye(newEmploye) {
    const {
      fullname, jenisKelamin, owner,
    } = newEmploye;
    const id = `employe-${this._idGenerator(10)}`;
    const query = {
      text: 'INSERT INTO employes VALUES ($1, $2, $3, $4) RETURNING id, fullname, owner',
      values: [id, fullname, jenisKelamin, owner],
    };

    const result = await this._pool.query(query);
    return new AddedEmploye({ ...result.rows[0] });
  }

  async getEmployeById(id) {
    const query = {
      text: `SELECT employes.id, employes.fullname, jenis_kelamin, username
        FROM employes
        LEFT JOIN users ON users.id = employes.owner
        WHERE employes.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('karyawan yg anda cari tidak ditemukan');
    }

    return result.rows.map(mapEmployeDBToModel)[0];
  }

  async getAllEmploye() {
    const query = {
      text: `SELECT employes.id, employes.fullname, username 
      FROM employes 
      LEFT JOIN users ON users.id = employes.owner`,
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = EmployeRepositoryPostgres;
