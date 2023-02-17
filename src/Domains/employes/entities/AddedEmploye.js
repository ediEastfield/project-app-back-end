class AddedEmploye {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id, fullname, owner,
    } = payload;

    this.id = id;
    this.fullname = fullname;
    this.owner = owner;
  }

  _verifyPayload({ id, fullname, owner }) {
    if (!id || !fullname || !owner) {
      throw new Error('ADDED_EMPLOYE.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof id !== 'string' || typeof fullname !== 'string' || typeof owner !== 'string') {
      throw new Error('ADDED_EMPLOYE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedEmploye;
