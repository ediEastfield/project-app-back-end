const NewEmploye = require('../NewEmploye');

describe('a  NewEmploye entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      fullname: 'karyawan',
    };

    // Action and Assert
    expect(() => new NewEmploye(payload)).toThrowError('NEW_EMPLOYE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      fullname: 123,
      jenisKelamin: true,
      owner: [],
    };

    // ACtion and Assert
    expect(() => new NewEmploye(payload)).toThrowError('NEW_EMPLOYE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create newEmploye object correctly', () => {
    // Arrange
    const payload = {
      fullname: 'karyawan',
      jenisKelamin: 'L',
      owner: 'user-123',
    };

    // Action
    const newEmploye = new NewEmploye(payload);

    // Assert
    expect(newEmploye).toBeInstanceOf(NewEmploye);
    expect(newEmploye.fullname).toEqual(payload.fullname);
    expect(newEmploye.jenisKelamin).toEqual(payload.jenisKelamin);
    expect(newEmploye.owner).toEqual(payload.owner);
  });
});
