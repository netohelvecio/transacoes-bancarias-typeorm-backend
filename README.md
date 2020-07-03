<div align="center">
  <img src="./public/gostack.png" />

  <h1>Desafio 06: Banco de dados e upload de arquivos no Node.js</h1>
</div>

## 🔖 Sobre

Aplicação feita durante o desafio 06 do bootcamp da Rocketseat. API para gestão de transações capaz de listar, criar, deletar transação, alem disso é possível enviar arquvio CSV para cadastrar múltiplas transações. Foram usandos conceitos de banco de dados, SOLID, DRY (Don't Repeat Yourself) e SoC (Separation of Concerns).

## 📁 Repósitorios relacionados
- Frontend - Ainda em construção.

## 💻: Tecnologias utilizadas

- csv-parser
- express
- multer
- postgres
- typeorm

## 📂 Como baixar o projeto

```bash
  # Clonar repositório
  $ git clone https://github.com/netohelvecio/transacoes-bancarias-typeorm-backend

  # Entrar na pasta do repositório
  $ cd transacoes-bancarias-typeorm-backend

  # Instalar dependências
  $ yarn

  # Criar banco de dados postgres com nome "bank_transaction" (foi utilizado docker com container do postgres)

  # Rodar migrations
  $ yarn typeorm migration:run

  # Inicar projeto
  $ yarn dev:server

  # Arquivo do insomnia está no repositório para testar as rotas.

  # Antes de rodar os testes é necessário criar banco de dados com o nome "gostack_desafio06_tests"

  # Rodar testes
  $ yarn test
```

---

Desenvolvido por Helvécio Neto
