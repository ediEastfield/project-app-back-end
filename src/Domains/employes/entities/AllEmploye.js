class AllEmploye {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id, fullname, jenisKelamin, username,
    } = payload;

    this.id = id;
    this.fullname = fullname;
    this.jenisKelamin = jenisKelamin;
    this.username = username;
  }

  _verifyPayload({
    id, fullname, jenisKelamin, username,
  }) {
    if (!id || !fullname || !jenisKelamin || !username) {
      throw new Error('ALL_EMPLOYE.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (
      typeof id !== 'string'
                || typeof fullname !== 'string'
                || typeof jenisKelamin !== 'string'
                || typeof username !== 'string') {
      throw new Error('ALL_EMPLOYE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AllEmploye;
