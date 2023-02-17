const AddedEmploye = require('../AddedEmploye');

describe('a AddedEmploye entities', () => {
  it('should throw when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'employe-123',
      fullname: 'karyawan',
    };

    // Action and Assert
    expect(() => new AddedEmploye(payload)).toThrowError('ADDED_EMPLOYE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      fullname: true,
      owner: [],
    };

    // Action and Assert
    expect(() => new AddedEmploye(payload)).toThrowError('ADDED_EMPLOYE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addedEmploye object correctly', () => {
    // Arrange
    const payload = {
      id: 'employe-123',
      fullname: 'karyawan',
      owner: 'user-123',
    };

    // Action
    const addedEmploye = new AddedEmploye(payload);

    // Assert
    expect(addedEmploye.id).toEqual(payload.id);
    expect(addedEmploye.fullname).toEqual(payload.fullname);
    expect(addedEmploye.owner).toEqual(payload.owner);
  });
});
