exports.up = (pgm) => {
  pgm.createTable('employes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    fullname: {
      type: 'TEXT',
      notNull: true,
    },
    jenis_kelamin: {
      type: 'VARCHAR(1)',
      notNull: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint('employes', 'fk_employes.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('employes', 'fk_employes.owner_users.id');
  pgm.dropTable('employes');
};
