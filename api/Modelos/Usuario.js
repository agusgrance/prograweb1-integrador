const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config");
const bcrypt = require("bcrypt");

const Usuario = sequelize.define(
  "usuarios",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El campo "nombre" no puede ser nulo',
        },
        notEmpty: {
          msg: 'El campo "nombre" no puede estar vacío',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: {
          msg: 'El campo "email" no puede ser nulo',
        },
        notEmpty: {
          msg: 'El campo "email" no puede estar vacío',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El campo "password" no puede ser nulo',
        },
        notEmpty: {
          msg: 'El campo "password" no puede estar vacío',
        },
      },
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {},
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    hooks: {
      beforeCreate: (unUsuario) => {
        unUsuario.password = bcrypt.hashSync(unUsuario.password, 10);
      },
      beforeUpdate: function (unUsuario) {
        unUsuario.password = bcrypt.hashSync(unUsuario.password, 10);
      },
      beforeBulkCreate: (usuarios) => {
        usuarios.forEach(
          (unUsuario) =>
            (unUsuario.password = bcrypt.hashSync(unUsuario.password, 10))
        );
      },
    },
  }
);

Usuario.prototype.verificar = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = Usuario;
