const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const criarRotasJogos = require('./routes/jogos');
const criarRotasUsuarios = require('./routes/usuarios');
const rotasUpload = require('./routes/upload');
const { auth } = require('./middlewares/auth');

const app = express();
const PORTA = 3000;
const jogos = [];
const usuarios = [];

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const swaggerDocument = {
  openapi: '3.0.0',
  info: { title: 'Catalogo de Jogos API', version: '1.0.0', description: 'API REST para cadastro de jogos, usuarios e imagens.' },
  servers: [{ url: 'http://localhost:3000' }],
  components: {
    securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
    schemas: {
      Jogo: {
        type: 'object',
        required: ['nome', 'genero', 'plataforma', 'ano'],
        properties: { id: { type: 'integer' }, nome: { type: 'string' }, genero: { type: 'string' }, plataforma: { type: 'string' }, ano: { type: 'integer' } }
      }
    }
  },
  paths: {
    '/usuarios': {
      post: {
        summary: 'Cadastra um usuario',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['nome', 'email', 'senha'], properties: { nome: { type: 'string' }, email: { type: 'string' }, senha: { type: 'string' } } } } } },
        responses: { 201: { description: 'Usuario cadastrado' }, 400: { description: 'Dados invalidos' } }
      }
    },
    '/usuarios/login': {
      post: {
        summary: 'Realiza login e retorna JWT',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['email', 'senha'], properties: { email: { type: 'string' }, senha: { type: 'string' } } } } } },
        responses: { 200: { description: 'Login realizado' }, 401: { description: 'Credenciais invalidas' } }
      }
    },
    '/jogos': {
      post: { summary: 'Cadastra um jogo', security: [{ bearerAuth: [] }], requestBody: { required: true, content: { 'application/json': { schema: { '$ref': '#/components/schemas/Jogo' } } } }, responses: { 201: { description: 'Jogo criado' }, 401: { description: 'Nao autorizado' } } },
      get: { summary: 'Lista todos os jogos', security: [{ bearerAuth: [] }], responses: { 200: { description: 'Lista de jogos' }, 401: { description: 'Nao autorizado' } } }
    },
    '/jogos/{id}': {
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID do jogo' }],
      get: { summary: 'Busca um jogo por ID', security: [{ bearerAuth: [] }], responses: { 200: { description: 'Jogo encontrado' }, 404: { description: 'Jogo nao encontrado' } } },
      put: { summary: 'Edita um jogo', security: [{ bearerAuth: [] }], requestBody: { required: true, content: { 'application/json': { schema: { '$ref': '#/components/schemas/Jogo' } } } }, responses: { 200: { description: 'Jogo atualizado' }, 404: { description: 'Jogo nao encontrado' } } },
      delete: { summary: 'Exclui um jogo', security: [{ bearerAuth: [] }], responses: { 200: { description: 'Jogo excluido' }, 404: { description: 'Jogo nao encontrado' } } }
    },
    '/upload': {
      post: { summary: 'Envia uma imagem', security: [{ bearerAuth: [] }], requestBody: { required: true, content: { 'multipart/form-data': { schema: { type: 'object', properties: { imagem: { type: 'string', format: 'binary' } } } } } }, responses: { 201: { description: 'Upload realizado' }, 400: { description: 'Arquivo invalido' } } }
    }
  }
};

app.get('/', (req, res) => res.json({ mensagem: 'API Catalogo de Jogos funcionando.' }));
app.use('/usuarios', criarRotasUsuarios(usuarios));
app.use('/jogos', auth, criarRotasJogos(jogos));
app.use('/upload', auth, rotasUpload);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
  console.log(`Swagger disponivel em http://localhost:${PORTA}/api-docs`);
});

module.exports = app;