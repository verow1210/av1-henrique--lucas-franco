# Catalogo de Jogos API

## Objetivo

Esta e uma API REST simples para cadastrar e consultar jogos. Os dados ficam em listas de objetos JavaScript e permanecem disponiveis enquanto o servidor estiver rodando. Nao ha banco de dados.

## Tecnologias

- Node.js e Express
- JavaScript
- bcrypt para proteger senhas
- JWT para autenticacao
- Multer para upload de imagens
- Swagger para documentacao

## Instalacao e execucao

No terminal, dentro da pasta do projeto:

```bash
npm install
npm start
```

O servidor roda em `http://localhost:3000` e a documentacao fica em `http://localhost:3000/api-docs`.

## Rotas

| Metodo | Caminho | Autenticacao | Funcao |
| --- | --- | --- | --- |
| GET | `/` | Nao | Verifica se a API esta funcionando |
| POST | `/usuarios` | Nao | Cadastra usuario |
| POST | `/usuarios/login` | Nao | Faz login e retorna token JWT |
| POST | `/jogos` | Sim | Cadastra jogo |
| GET | `/jogos` | Sim | Lista jogos |
| GET | `/jogos/:id` | Sim | Busca jogo por ID |
| PUT | `/jogos/:id` | Sim | Edita jogo |
| DELETE | `/jogos/:id` | Sim | Exclui jogo |
| POST | `/upload` | Sim | Envia imagem no campo `imagem` |

## Como fazer login

Primeiro cadastre um usuario em `POST /usuarios`:

```json
{
  "nome": "Ana Silva",
  "email": "ana@email.com",
  "senha": "123456"
}
```

Depois envie o mesmo email e senha para `POST /usuarios/login`. Copie o valor de `token` da resposta. Para acessar as rotas protegidas, envie este cabecalho:

```text
Authorization: Bearer SEU_TOKEN_AQUI
```

## Exemplos de jogos

Em `POST /jogos`, usando `application/json`:

```json
{
  "nome": "Hades",
  "genero": "Roguelike",
  "plataforma": "PC",
  "ano": 2020
}
```

## Upload

Use `POST /upload` com o tipo `Multipart Form` no Insomnia. Adicione um campo do tipo arquivo chamado exatamente `imagem` e selecione um arquivo JPG, JPEG, PNG ou WEBP de ate 2 MB.

## Swagger

Abra `http://localhost:3000/api-docs` no navegador. Na documentacao, use o botao **Authorize**, informe apenas `SEU_TOKEN_AQUI` no campo Bearer e execute as rotas protegidas.

## Observacao

Como os dados ficam em memoria, usuarios e jogos sao perdidos quando o servidor e encerrado ou reiniciado.