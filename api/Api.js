const express = require('express')
const app = express()
const cors = require('cors');
const port = 3001
const bodyParser = require('body-parser')
const { sequelize } = require('./Config')
const { DataTypes } = require('sequelize');
const { Usuario } = require('./Modelos')
const { verificarToken } = require('./Middlewares')
const { usuarios, login } = require('./Rutas')

app.use(bodyParser.json());

sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      popular();
      console.log('El servidor está corriendo en el puerto ' + port);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

app.use(cors());
app.use('/', login);
app.use('/', verificarToken, usuarios);

const popular = async function () {
  const qUsuarios = await Usuario.count();
  if(qUsuarios==0) {
    const usuarios = [
        {
          nombre: 'Super Admin',
          email: 'super@admin.com',
          password: 'abc123',
          foto: 'data:image/jpeg;base64,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'
        },
        {
          nombre: 'Peter Cantropus',
          email: 'pcantropus@example.com',
          password: 'pc123',
          foto: null
        },
        {
          nombre: 'John Doe',
          email: 'johndoe@example.com',
          password: 'jd123',
          foto: null
        },
        {
          nombre: 'Diego Armando',
          email: 'marado@example.com',
          password: 'da123',
          foto: 'data:image/jpeg;base64,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'
        },
        {
          nombre: 'Michael Johnson',
          email: 'michaeljohnson@example.com',
          password: 'abc123',
          foto: null
        },
        {
          nombre: 'Emily Davis',
          email: 'emilydavis@example.com',
          password: 'ed123',
          foto: null
        },
        {
          nombre: 'Daniel Wilson',
          email: 'danielwilson@example.com',
          password: 'dw123',
          foto: null
        },
        {
          nombre: 'Sophia Thomas',
          email: 'sophiathomas@example.com',
          password: 'st23',
          foto: null
        }
    ];

    Usuario.bulkCreate(usuarios, { validate: true });
  }
}