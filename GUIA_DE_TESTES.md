# 🎬 Guia de Testes - API Catálogo de Filmes

## 📋 Instruções de Execução

### 1. Instalação das Dependências

```bash
npm install
```

### 2. Iniciar o Servidor

```bash
npm start
```

ou

```bash
npm run dev
```

O servidor iniciará em: `http://localhost:3000`

---

## 🧪 Testes com Insomnia ou Postman

A API disponibiliza 5 endpoints para operações CRUD no recurso `/filmes`.

### 🟢 1. POST /filmes - Criar um Novo Filme

**Método:** `POST`  
**URL:** `http://localhost:3000/filmes`  
**Status Esperado:** `201 Created`

#### Exemplo de Corpo da Requisição (JSON):

```json
{
  "titulo": "Oppenheimer",
  "diretor": "Christopher Nolan",
  "ano": 2023,
  "genero": "Biografia"
}
```

#### Resposta de Sucesso (201):

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "titulo": "Oppenheimer",
  "diretor": "Christopher Nolan",
  "ano": 2023,
  "genero": "Biografia"
}
```

#### Resposta de Erro - Campo Faltante (400):

Se faltar algum campo obrigatório:

```json
{
  "erro": "Todos os campos são obrigatórios: titulo, diretor, ano, genero"
}
```

---

### 🔵 2. GET /filmes - Listar Todos os Filmes

**Método:** `GET`  
**URL:** `http://localhost:3000/filmes`  
**Status Esperado:** `200 OK`

#### Resposta de Sucesso (200):

```json
[
  {
    "id": "uuid-1",
    "titulo": "Inception",
    "diretor": "Christopher Nolan",
    "ano": 2010,
    "genero": "Ficção Científica"
  },
  {
    "id": "uuid-2",
    "titulo": "Interestelar",
    "diretor": "Christopher Nolan",
    "ano": 2014,
    "genero": "Ficção Científica"
  },
  {
    "id": "uuid-3",
    "titulo": "O Poderoso Chefão",
    "diretor": "Francis Ford Coppola",
    "ano": 1972,
    "genero": "Drama"
  }
]
```

---

### 🟡 3. GET /filmes/:id - Buscar Filme por ID

**Método:** `GET`  
**URL:** `http://localhost:3000/filmes/{id}`  
**Status Esperado:** `200 OK` ou `404 Not Found`

#### Exemplo de URL:

```
http://localhost:3000/filmes/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

#### Resposta de Sucesso (200):

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "titulo": "Inception",
  "diretor": "Christopher Nolan",
  "ano": 2010,
  "genero": "Ficção Científica"
}
```

#### Resposta de Erro - ID Não Encontrado (404):

```json
{
  "erro": "Filme com ID a1b2c3d4-e5f6-7890-abcd-ef1234567890 não encontrado"
}
```

---

### 🟠 4. PUT /filmes/:id - Atualizar um Filme

**Método:** `PUT`  
**URL:** `http://localhost:3000/filmes/{id}`  
**Status Esperado:** `200 OK` ou `404 Not Found`

#### Exemplo de URL:

```
http://localhost:3000/filmes/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

#### Exemplo de Corpo da Requisição (JSON):

Você pode atualizar um ou mais campos:

```json
{
  "titulo": "Inception - Versão Estendida",
  "ano": 2011
}
```

#### Resposta de Sucesso (200):

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "titulo": "Inception - Versão Estendida",
  "diretor": "Christopher Nolan",
  "ano": 2011,
  "genero": "Ficção Científica"
}
```

#### Resposta de Erro - ID Não Encontrado (404):

```json
{
  "erro": "Filme com ID a1b2c3d4-e5f6-7890-abcd-ef1234567890 não encontrado"
}
```

---

### 🔴 5. DELETE /filmes/:id - Deletar um Filme

**Método:** `DELETE`  
**URL:** `http://localhost:3000/filmes/{id}`  
**Status Esperado:** `200 OK` ou `404 Not Found`

#### Exemplo de URL:

```
http://localhost:3000/filmes/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

#### Resposta de Sucesso (200):

```json
{
  "mensagem": "Filme removido com sucesso",
  "filme": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "titulo": "Inception",
    "diretor": "Christopher Nolan",
    "ano": 2010,
    "genero": "Ficção Científica"
  }
}
```

#### Resposta de Erro - ID Não Encontrado (404):

```json
{
  "erro": "Filme com ID a1b2c3d4-e5f6-7890-abcd-ef1234567890 não encontrado"
}
```

---

## 📝 Passos para Testar no Insomnia/Postman

### Teste 1: Listar Todos os Filmes

1. Crie uma requisição **GET**
2. Cole a URL: `http://localhost:3000/filmes`
3. Clique em **Send**
4. Você deve receber os 3 filmes pré-carregados

### Teste 2: Criar um Novo Filme

1. Crie uma requisição **POST**
2. Cole a URL: `http://localhost:3000/filmes`
3. Na aba **Body**, selecione **JSON** (raw)
4. Cole o JSON abaixo:

```json
{
  "titulo": "Duna",
  "diretor": "Denis Villeneuve",
  "ano": 2021,
  "genero": "Ficção Científica"
}
```

5. Clique em **Send**
6. Copie o **id** da resposta para usar nos próximos testes

### Teste 3: Buscar um Filme Específico

1. Crie uma requisição **GET**
2. Cole a URL: `http://localhost:3000/filmes/{id_do_filme}`
   - Substitua `{id_do_filme}` pelo ID copiado no teste anterior
3. Clique em **Send**

### Teste 4: Atualizar um Filme

1. Crie uma requisição **PUT**
2. Cole a URL: `http://localhost:3000/filmes/{id_do_filme}`
3. Na aba **Body**, selecione **JSON** (raw)
4. Cole o JSON abaixo:

```json
{
  "diretor": "Denis Villeneuve (Atualizado)",
  "ano": 2022
}
```

5. Clique em **Send**

### Teste 5: Deletar um Filme

1. Crie uma requisição **DELETE**
2. Cole a URL: `http://localhost:3000/filmes/{id_do_filme}`
3. Clique em **Send**
4. Você deve receber a mensagem de sucesso com o filme deletado

---

## ✅ Checklist de Requisitos Atendidos

- ✓ Servidor Node.js com Express
- ✓ Middleware `express.json()` configurado
- ✓ IDs únicos e automáticos (usando `uuid`)
- ✓ Respostas em formato JSON com códigos HTTP corretos
- ✓ Validação de campos obrigatórios
- ✓ Banco de dados em memória (sem BD externo)
- ✓ CRUD completo: CREATE, READ, UPDATE, DELETE
- ✓ 3 filmes pré-carregados na inicialização

---

## 🚀 Notas Importantes

- O banco de dados está em memória, então os dados são **perdidos** ao reiniciar o servidor
- Todos os IDs são gerados automaticamente usando `uuid` v4
- Os códigos HTTP seguem o padrão RESTful
- A validação ocorre apenas para campos obrigatórios no POST
- No PUT, todos os campos são opcionais (atualização parcial)

---

## 📞 Suporte

Caso tenha dúvidas, verifique:
1. Se o servidor está rodando na porta 3000
2. Se está usando o método HTTP correto (GET, POST, PUT, DELETE)
3. Se o formato JSON está correto (use ferramentas como jsonlint.com para validar)
