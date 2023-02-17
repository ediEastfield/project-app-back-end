const DetailEmploye = require('../DetailEmploye');

describe('a DetailEmploye entities', () => {
  it('should throw when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'employe-123',
      fullname: 'karyawan',
      jenisKelamin: 'L',
    };

    // Action and Assert
    expect(() => new DetailEmploye(payload)).toThrowError('DETAIL_EMPLOYE.NOT_CONTAIN_NEEDED_PROPERTY');
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
    expect(() => new DetailEmploye(payload)).toThrowError('DETAIL_EMPLOYE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should show detailEmploye object correctly', () => {
    // Arrange
    const payload = {
      id: 'employe-123',
      fullname: 'karyawan',
      jenisKelamin: 'L',
      username: 'dicoding',
    };

    // Action
    const detailEmploye = new DetailEmploye(payload);

    // Assert
    expect(detailEmploye.id).toEqual(payload.id);
    expect(detailEmploye.fullname).toEqual(payload.fullname);
    expect(detailEmploye.jenisKelamin).toEqual(payload.jenisKelamin);
    expect(detailEmploye.username).toEqual(payload.username);
  });
});
