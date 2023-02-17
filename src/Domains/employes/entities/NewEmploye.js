class NewEmploye {
  constructor(payload) {
    this._verifyPayload(payload);

    const { fullname, jenisKelamin, owner } = payload;

    this.fullname = fullname;
    this.jenisKelamin = jenisKelamin;
    this.owner = owner;
  }

  _verifyPayload({ fullname, jenisKelamin, owner }) {
    if (!fullname || !jenisKelamin || !owner) {
      throw new Error('NEW_EMPLOYE.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof fullname !== 'string' || typeof jenisKelamin !== 'string' || typeof owner !== 'string') {
      throw new Error('NEW_EMPLOYE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewEmploye;
