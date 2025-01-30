# Desafio Fullstack - CRUD de Produtos, Itens e Carrinhos

Este projeto foi desenvolvido como parte de um desafio fullstack, utilizando **C#** no backend e **React** no frontend. O objetivo é implementar um CRUD básico para as entidades **Produto**, **Item** e **Carrinho**, com relacionamentos entre elas.

---

## Funcionalidades

### Backend (C#)
- **Produto**:
  - CRUD completo (Create, Read, Update, Delete).
  - Atributo: `Nome`.

- **Item**:
  - CRUD completo.
  - Atributos: `Produto` (relacionamento), `Quantidade`, `UnidadeMedida`.

- **Carrinho**:
  - CRUD completo.
  - Atributos: `Identificador`, `ItensCarrinho` (relacionamento muitos-para-muitos com `Item`).

### Frontend (React + Vite + MUI)
- **Telas**:
  - **Produtos**: Listagem, cadastro e atualização de produtos.
  - **Itens**: Listagem, cadastro e atualização de itens, com relacionamento com produtos.
  - **Carrinhos**: Listagem de carrinhos e adição de itens.
  - **Dashboard**: Exibe a quantidade de produtos, itens e carrinhos cadastrados.

- **Funcionalidades Comuns**:
  - Campo de busca em todas as telas de listagem.
  - Interface responsiva e moderna utilizando a biblioteca MUI (Material-UI).

---

## Tecnologias Utilizadas

### Backend
- **Linguagem**: C#
- **Framework**: ASP.NET Core
- **Banco de Dados**: SQLite (configurado via Entity Framework Core)
- **Bibliotecas**:
  - Entity Framework Core (ORM)
  - Swagger (documentação da API)

### Frontend
- **Linguagem**: JavaScript (React)
- **Ferramenta de Build**: Vite
- **Bibliotecas**:
  - React Router DOM (roteamento)
  - Axios (consumo da API)
  - MUI (Material-UI) (componentes de interface)

---

## Como Executar o Projeto

### Pré-requisitos
- **Backend**:
  - [.NET SDK](https://dotnet.microsoft.com/download) (versão 6 ou superior)
  - [Visual Studio](https://visualstudio.microsoft.com/) ou [Visual Studio Code](https://code.visualstudio.com/) (opcional)

- **Frontend**:
  - [Node.js](https://nodejs.org/) (versão 16 ou superior)
  - [npm](https://www.npmjs.com/) (gerenciador de pacotes)

### Passo a Passo

1. **Clonar o Repositório**:
   ```bash
   git clone https://github.com/seu-usuario/desafio-fullstack.git
   cd desafio-fullstack
   ```

2. **Configurar o Backend**:
   - Navegue até a pasta do backend:
     ```bash
     cd Desafio
     ```
   - Restaure as dependências e execute o projeto:
     ```bash
     dotnet restore
     dotnet run
     ```
   - O backend estará disponível em `http://localhost:5019`.

3. **Configurar o Frontend**:
   - Navegue até a pasta do frontend:
     ```bash
     cd ../frontend
     ```
   - Instale as dependências:
     ```bash
     npm install
     ```
   - Execute o projeto:
     ```bash
     npm run dev
     ```
   - O frontend estará disponível em `http://localhost:5173`.

4. **Acessar a Aplicação**:
   - Abra o navegador e acesse `http://localhost:5173`.
   - Utilize as telas de **Produtos**, **Itens**, **Carrinhos** e **Dashboard** para interagir com a aplicação.

---

## Estrutura do Projeto

### Backend
- **Controllers**: Contém os controladores para `Produto`, `Item` e `Carrinho`.
- **Models**: Define as entidades `Produto`, `Item`, `Carrinho` e `CarrinhoItem`.
- **Data**: Configuração do `AppDbContext` e migrações do banco de dados.
- **Program.cs**: Configuração do servidor e serviços.

### Frontend
- **src**: Contém o código-fonte do frontend.
  - **pages**: Telas da aplicação (`Produtos.jsx`, `Itens.jsx`, `Carrinhos.jsx`, `Dashboard.jsx`).
  - **services**: Configuração da API (`api.js`).
  - **App.jsx**: Configuração do roteamento e layout principal.



