const dotenv = require('dotenv').config();

const token = process.env.TOKEN;

function authorization(req, res, next) {
  const token = req.headers.authorization;
  
  if (!token || token !== `${token}`) {
    return res.status(401).json({ error: 'Acesso não autorizado' });
  }

  next();
}

module.exports = { authorization };
