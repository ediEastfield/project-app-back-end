const AllEmploye = require('../AllEmploye');

describe('a AllEmploye entities', () => {
  it('should throw when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'employe-123',
      fullname: 'karyawan',
      jenisKelamin: 'L',
    };

    // Action and Assert
    expect(() => new AllEmploye(payload)).toThrowError('ALL_EMPLOYE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      fullname: true,
      jenisKelamin: {},
      username: [],
    };

    // Action and Assert
    expect(() => new AllEmploye(payload)).toThrowError('ALL_EMPLOYE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should show allEmploye object correctly', () => {
    // Arrange
    const payload = {
      id: 'employe-123',
      fullname: 'karyawan',
      jenisKelamin: 'L',
      username: 'dicoding',
    };

    // Action
    const allEmploye = new AllEmploye(payload);

    // Assert
    expect(allEmploye.id).toEqual(payload.id);
    expect(allEmploye.fullname).toEqual(payload.fullname);
    expect(allEmploye.jenisKelamin).toEqual(payload.jenisKelamin);
    expect(allEmploye.username).toEqual(payload.username);
  });
});
