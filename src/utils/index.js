/* eslint-disable camelcase */

const mapEmployeDBToModel = ({
  id,
  fullname,
  jenis_kelamin,
  username,
}) => ({
  id,
  fullname,
  jenisKelamin: jenis_kelamin,
  username,
});

module.exports = { mapEmployeDBToModel };
