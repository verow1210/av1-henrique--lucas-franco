# 🎬 Catálogo de Filmes - API RESTful

Projeto de API RESTful desenvolvido com **Node.js** e **Express** para gerenciar um catálogo de filmes/séries. Ideal para avaliação acadêmica de Desenvolvimento de Websites.

---

## 📦 Estrutura do Projeto

```
catalogo-filmes-api/
├── package.json              # Dependências e scripts do projeto
├── server.js                 # Servidor Express com todas as rotas CRUD
├── GUIA_DE_TESTES.md        # Guia completo de testes (Insomnia/Postman)
└── README.md                 # Este arquivo
```

---

## 🚀 Quick Start

### 1. Instalar Dependências

```bash
npm install
```

### 2. Iniciar o Servidor

```bash
npm start
```

O servidor iniciará em: **http://localhost:3000**

---

## 📚 Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/filmes` | Criar novo filme |
| `GET` | `/filmes` | Listar todos os filmes |
| `GET` | `/filmes/:id` | Buscar filme por ID |
| `PUT` | `/filmes/:id` | Atualizar filme |
| `DELETE` | `/filmes/:id` | Deletar filme |

---

## 💻 Exemplo de Uso

### Criar um Filme

```bash
curl -X POST http://localhost:3000/filmes \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Avatar",
    "diretor": "James Cameron",
    "ano": 2009,
    "genero": "Ficção Científica"
  }'
```

### Listar Todos os Filmes

```bash
curl http://localhost:3000/filmes
```

---

## ✨ Características

- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Validação de campos obrigatórios
- ✅ IDs únicos gerados automaticamente (UUID v4)
- ✅ Banco de dados em memória (sem dependências externas)
- ✅ Códigos HTTP corretos (200, 201, 400, 404)
- ✅ Respostas em formato JSON
- ✅ Código bem comentado e estruturado
- ✅ 3 filmes pré-carregados na inicialização

---

## 🧪 Testes

Para testar a API, use **Insomnia** ou **Postman**. Consulte o arquivo **GUIA_DE_TESTES.md** para exemplos detalhados de todas as requisições.

---

## 📋 Requisitos Técnicos Atendidos

- [x] Servidor Node.js + Express
- [x] Middleware `express.json()`
- [x] IDs automáticos e únicos (uuid)
- [x] Respostas JSON com status HTTP corretos
- [x] Validação de campos obrigatórios
- [x] Banco de dados em memória
- [x] Todas as 5 rotas CRUD implementadas

---

## 📝 Dependências

- **express** ^4.18.2 - Framework web para Node.js
- **uuid** ^9.0.0 - Geração de IDs únicos

---

## 🔍 Dados Iniciais

O servidor inicia com 3 filmes pré-carregados:

1. **Inception** - Christopher Nolan (2010) - Ficção Científica
2. **Interestelar** - Christopher Nolan (2014) - Ficção Científica
3. **O Poderoso Chefão** - Francis Ford Coppola (1972) - Drama

---

## ⚠️ Nota Importante

Os dados são armazenados **em memória**, portanto são **perdidos** ao reiniciar o servidor. Isso é proposital conforme os requisitos da AV1 (sem uso de banco de dados externo).

---

## 📞 Suporte

Verifique o arquivo **GUIA_DE_TESTES.md** para:
- Exemplos detalhados de cada endpoint
- Passo a passo para testar no Insomnia/Postman
- Respostas esperadas para cada requisição

---

**Desenvolvido para: AV1 - Desenvolvimento de Websites**
