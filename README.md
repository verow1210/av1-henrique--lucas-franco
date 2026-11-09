# Catálogo de Jogos — AV1 e AV2

Projeto acadêmico com API Node.js/Express, arquitetura MVC, Sequelize + SQLite, autenticação JWT e interface React.

## Requisitos
Instale Node.js LTS. **Não precisa de XAMPP**: o banco é SQLite.

## Backend
1. Abra um terminal na pasta `backend`.
2. Execute `npm install`.
3. Copie `.env.example` para `.env` (PowerShell: `Copy-Item .env.example .env`).
4. Abra `.env` e troque `JWT_SECRET` por uma chave própria.
5. Execute `npm run dev`. A API estará em `http://localhost:3000`.
6. O arquivo `backend/database.sqlite` será criado automaticamente.

## Frontend
1. Abra outro terminal na pasta `frontend`.
2. Execute `npm install`.
3. Opcional: copie `.env.example` para `.env`.
4. Execute `npm run dev`.
5. Abra o endereço mostrado pelo Vite, normalmente `http://localhost:5173`.

## Demonstração sugerida
1. Cadastre uma conta com nome, email e senha de pelo menos 6 caracteres.
2. Faça login.
3. Cadastre um jogo, edite-o e exclua-o.
4. Faça logout.
5. Teste uma rota `/jogos` sem token no Insomnia: deve retornar 401.
6. Reinicie o backend e confira que os jogos continuam salvos no SQLite.

## Rotas
| Método | Rota | Autenticação | Função |
|---|---|---|---|
| GET | `/` | Não | Saúde da API |
| POST | `/usuarios` | Não | Cadastro |
| POST | `/usuarios/login` | Não | Login/JWT |
| GET | `/jogos` | Bearer | Listar (aceita `?busca=nome`) |
| GET | `/jogos/:id` | Bearer | Consultar |
| POST | `/jogos` | Bearer | Cadastrar |
| PUT/PATCH | `/jogos/:id` | Bearer | Atualizar |
| DELETE | `/jogos/:id` | Bearer | Excluir |

Exemplo de usuário: `{"nome":"Lucas","email":"lucas@email.com","senha":"123456"}`.
Exemplo de jogo: `{"nome":"Minecraft","genero":"Aventura","plataforma":"PC","ano":2011,"descricao":"Exploração e construção."}`.

## MVC
- Models: `backend/src/models`.
- Controllers: `backend/src/controllers`.
- Routes: `backend/src/routes`.
- Middlewares: autenticação e erros.
- Config: conexão Sequelize/SQLite.

## Insomnia
Importe `insomnia/catalogo-jogos-insomnia.json` em Import > From File. Cadastre o usuário, faça login e copie o token da resposta para a variável `token` do ambiente.

## Segurança e limitações
Senhas são armazenadas com hash bcryptjs. JWT expira em 2 horas por padrão. Não publique `.env` nem `database.sqlite`. O pacote foi montado com base nos arquivos enviados, mas a instalação e execução precisam ser verificadas no computador em que será apresentado.
