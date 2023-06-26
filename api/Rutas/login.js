const express=require('express')
const router=express.Router()
const { Usuario } = require('../Modelos')
const { jwtSecretKey } = require('../Config')
const jwt = require('jsonwebtoken');

router.post('/login/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const unUsuario = await Usuario.findOne({
      attributes: ['id', 'nombre', 'email', 'password'],
      where: {
        email: email,
      }
    });
    if (unUsuario && unUsuario.verificar(password)) {
      const token = jwt.sign(unUsuario.dataValues, jwtSecretKey, { expiresIn: 3600 });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Las credenciales son incorrectas' });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ errores: error.errors.map(function (e) {return e.message;}) });
  }

});

module.exports = router;
