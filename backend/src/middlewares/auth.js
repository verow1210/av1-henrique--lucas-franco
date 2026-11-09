const jwt = require('jsonwebtoken');
module.exports = function auth(req,res,next) {
 const h=req.headers.authorization||'';
 if(!h.startsWith('Bearer ')) return res.status(401).json({erro:'Token não informado. Use Authorization: Bearer TOKEN.'});
 try { req.usuario=jwt.verify(h.slice(7),process.env.JWT_SECRET); return next(); }
 catch { return res.status(401).json({erro:'Token inválido ou expirado.'}); }
};
