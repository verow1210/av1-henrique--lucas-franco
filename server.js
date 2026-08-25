// ============================================================
// API RESTful - Catálogo de Filmes
// Servidor Express com operações CRUD em memória
// ============================================================

const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

// ============================================================
// MIDDLEWARE
// ============================================================

// Middleware para processar JSON nas requisições
app.use(express.json());

// ============================================================
// BANCO DE DADOS EM MEMÓRIA
// ============================================================

// Array com 3 filmes de exemplo para inicializar o banco
let filmes = [
  {
    id: uuidv4(),
    titulo: 'Inception',
    diretor: 'Christopher Nolan',
    ano: 2010,
    genero: 'Ficção Científica'
  },
  {
    id: uuidv4(),
    titulo: 'Interestelar',
    diretor: 'Christopher Nolan',
    ano: 2014,
    genero: 'Ficção Científica'
  },
  {
    id: uuidv4(),
    titulo: 'O Poderoso Chefão',
    diretor: 'Francis Ford Coppola',
    ano: 1972,
    genero: 'Drama'
  }
];

// ============================================================
// ROTAS CRUD
// ============================================================

/**
 * POST /filmes
 * Cadastra um novo filme
 * Corpo: { titulo, diretor, ano, genero }
 * Retorna: 201 (Created) com o filme criado ou 400 (Bad Request)
 */
app.post('/filmes', (req, res) => {
  const { titulo, diretor, ano, genero } = req.body;

  // Validação: verifica se todos os campos obrigatórios foram fornecidos
  if (!titulo || !diretor || !ano || !genero) {
    return res.status(400).json({
      erro: 'Todos os campos são obrigatórios: titulo, diretor, ano, genero'
    });
  }

  // Cria o novo filme com ID único
  const novoFilme = {
    id: uuidv4(),
    titulo,
    diretor,
    ano,
    genero
  };

  // Adiciona o filme ao banco de dados
  filmes.push(novoFilme);

  // Retorna 201 (Created) com o filme criado
  res.status(201).json(novoFilme);
});

/**
 * GET /filmes
 * Retorna todos os filmes cadastrados
 * Retorna: 200 (OK) com array de filmes
 */
app.get('/filmes', (req, res) => {
  res.status(200).json(filmes);
});

/**
 * GET /filmes/:id
 * Busca um filme específico pelo ID
 * Retorna: 200 (OK) com o filme ou 404 (Not Found)
 */
app.get('/filmes/:id', (req, res) => {
  const { id } = req.params;

  // Procura o filme com o ID fornecido
  const filme = filmes.find(f => f.id === id);

  // Se não encontrar, retorna 404
  if (!filme) {
    return res.status(404).json({
      erro: `Filme com ID ${id} não encontrado`
    });
  }

  // Retorna o filme encontrado
  res.status(200).json(filme);
});

/**
 * PUT /filmes/:id
 * Atualiza um filme existente
 * Corpo: { titulo, diretor, ano, genero } (todos os campos são opcionais)
 * Retorna: 200 (OK) com o filme atualizado ou 404 (Not Found)
 */
app.put('/filmes/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, diretor, ano, genero } = req.body;

  // Procura o filme com o ID fornecido
  const filme = filmes.find(f => f.id === id);

  // Se não encontrar, retorna 404
  if (!filme) {
    return res.status(404).json({
      erro: `Filme com ID ${id} não encontrado`
    });
  }

  // Atualiza apenas os campos fornecidos
  if (titulo !== undefined) filme.titulo = titulo;
  if (diretor !== undefined) filme.diretor = diretor;
  if (ano !== undefined) filme.ano = ano;
  if (genero !== undefined) filme.genero = genero;

  // Retorna o filme atualizado
  res.status(200).json(filme);
});

/**
 * DELETE /filmes/:id
 * Remove um filme pelo ID
 * Retorna: 200 (OK) com mensagem de sucesso ou 404 (Not Found)
 */
app.delete('/filmes/:id', (req, res) => {
  const { id } = req.params;

  // Encontra o índice do filme
  const indice = filmes.findIndex(f => f.id === id);

  // Se não encontrar, retorna 404
  if (indice === -1) {
    return res.status(404).json({
      erro: `Filme com ID ${id} não encontrado`
    });
  }

  // Remove o filme do array
  const filmeRemovido = filmes.splice(indice, 1);

  // Retorna mensagem de sucesso
  res.status(200).json({
    mensagem: 'Filme removido com sucesso',
    filme: filmeRemovido[0]
  });
});

// ============================================================
// INICIALIZAÇÃO DO SERVIDOR
// ============================================================

app.listen(PORT, () => {
  console.log(`\n✓ Servidor rodando em http://localhost:${PORT}`);
  console.log(`✓ Total de filmes carregados: ${filmes.length}\n`);
});
