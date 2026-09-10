const express = require('express');

function criarRotasJogos(jogos) {
  const router = express.Router();

  function dadosValidos(dados) {
    return typeof dados.nome === 'string' && dados.nome.trim() &&
      typeof dados.genero === 'string' && dados.genero.trim() &&
      typeof dados.plataforma === 'string' && dados.plataforma.trim() &&
      dados.ano !== undefined && dados.ano !== '';
  }

  router.post('/', (req, res) => {
    const { nome, genero, plataforma, ano } = req.body;
    if (!dadosValidos(req.body)) {
      return res.status(400).json({ erro: 'Nome, genero, plataforma e ano sao obrigatorios.' });
    }

    const novoJogo = {
      id: jogos.length ? jogos[jogos.length - 1].id + 1 : 1,
      nome: String(nome).trim(),
      genero: String(genero).trim(),
      plataforma: String(plataforma).trim(),
      ano: Number(ano)
    };

    if (!Number.isInteger(novoJogo.ano) || novoJogo.ano < 1950 || novoJogo.ano > 2100) {
      return res.status(400).json({ erro: 'O ano deve ser um numero inteiro valido.' });
    }

    jogos.push(novoJogo);
    return res.status(201).json(novoJogo);
  });

  router.get('/', (req, res) => res.json(jogos));

  router.get('/:id', (req, res) => {
    const jogo = jogos.find((item) => item.id === Number(req.params.id));
    if (!jogo) return res.status(404).json({ erro: 'Jogo nao encontrado.' });
    return res.json(jogo);
  });

  router.put('/:id', (req, res) => {
    const indice = jogos.findIndex((item) => item.id === Number(req.params.id));
    if (indice === -1) return res.status(404).json({ erro: 'Jogo nao encontrado.' });
    if (!dadosValidos(req.body)) {
      return res.status(400).json({ erro: 'Nome, genero, plataforma e ano sao obrigatorios.' });
    }

    const jogoAtualizado = {
      id: jogos[indice].id,
      nome: String(req.body.nome).trim(),
      genero: String(req.body.genero).trim(),
      plataforma: String(req.body.plataforma).trim(),
      ano: Number(req.body.ano)
    };
    if (!Number.isInteger(jogoAtualizado.ano) || jogoAtualizado.ano < 1950 || jogoAtualizado.ano > 2100) {
      return res.status(400).json({ erro: 'O ano deve ser um numero inteiro valido.' });
    }

    jogos[indice] = jogoAtualizado;
    return res.json(jogoAtualizado);
  });

  router.delete('/:id', (req, res) => {
    const indice = jogos.findIndex((item) => item.id === Number(req.params.id));
    if (indice === -1) return res.status(404).json({ erro: 'Jogo nao encontrado.' });
    const [jogoRemovido] = jogos.splice(indice, 1);
    return res.json({ mensagem: 'Jogo excluido com sucesso.', jogo: jogoRemovido });
  });

  return router;
}

module.exports = criarRotasJogos;