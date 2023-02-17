/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const EmployesTableTestHelper = {
  async addEmployes({
    id = 'employe-123',
    fullname = 'karyawan',
    jenisKelamin = 'L',
    owner = 'user-123',
  }) {
    const query = {
      text: 'INSERT INTO employes VALUES($1, $2, $3, $4)',
      values: [id, fullname, jenisKelamin, owner],
    };

    await pool.query(query);
  },

  async getAllThread() {
    const result = await pool.query('SELECT * FROM employes');
    return result.rows;
  },

  async findEmployesById(id) {
    const query = {
      text: 'SELECT * FROM employes WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM employes WHERE 1=1');
  },
};

module.exports = EmployesTableTestHelper;
