const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middlewares/auth');

function criarRotasUsuarios(usuarios) {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, email e senha sao obrigatorios.' });
    }

    const emailNormalizado = email.trim().toLowerCase();
    if (usuarios.some((usuario) => usuario.email === emailNormalizado)) {
      return res.status(409).json({ erro: 'Este email ja esta cadastrado.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoUsuario = {
      id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
      nome: nome.trim(),
      email: emailNormalizado,
      senha: senhaCriptografada
    };

    usuarios.push(novoUsuario);
    return res.status(201).json({
      mensagem: 'Usuario cadastrado com sucesso.',
      usuario: { id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email }
    });
  });

  router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const usuario = usuarios.find((item) => item.email === String(email || '').trim().toLowerCase());

    if (!usuario || !senha || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ erro: 'Email ou senha incorretos.' });
    }

    const token = jwt.sign({ id: usuario.id, nome: usuario.nome, email: usuario.email }, JWT_SECRET, {
      expiresIn: '2h'
    });

    return res.json({ mensagem: 'Login realizado com sucesso.', token });
  });

  return router;
}

module.exports = criarRotasUsuarios;