const r=require('express').Router();const c=require('../controllers/usuariosController');r.post('/',c.cadastrar);r.post('/login',c.login);module.exports=r;
