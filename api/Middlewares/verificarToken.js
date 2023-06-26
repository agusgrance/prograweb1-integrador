const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../Config')

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (typeof token !== 'undefined') {
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        res.status(403).json({ error: 'Token inválido' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'No autorizado' });
  }
}

module.exports = verificarToken;