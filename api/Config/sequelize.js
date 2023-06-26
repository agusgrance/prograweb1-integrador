const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  storage: './Storage/database.db',
  dialect: 'sqlite',
  define: {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
  },
  logging: false,
});

module.exports = sequelize;
