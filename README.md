<<<<<<< HEAD
# Sistema de Biblioteca Universitária 📚

Projeto full-stack de um sistema de gerenciamento de biblioteca para fins acadêmicos e de prototipação. Inclui frontend HTML/CSS/JavaScript e backend Node.js + Express com CRUD de usuários, livros, empréstimos e multas.

---

## 📋 Sobre o Projeto

- **Frontend**: HTML5 + CSS3 + JavaScript (Vanilla)
- **Backend**: Node.js + Express + JavaScript
- **Autenticação**: Sistema de login com validação
- **Persistência**: MySQL
- **Arquitetura**: MVC + DAO (Data Access Object)
- **Perfis**: Administrador/Bibliotecário

---

## 🏗️ Estrutura do Repositório

```text
Biblioteca/
├─ DAO/                           # Data Access Objects
│  ├─ UsuarioDAO.js
│  ├─ LivroDAO.js
│  ├─ EmprestimoDAO.js
│  └─ MultaDAO.js
│
├─ services/                      # Lógica de negócio
│  ├─ UsuarioService.js
│  ├─ LivroService.js
│  ├─ EmprestimoService.js
│  └─ MultaService.js
│
├─ controllers/                   # Controladores das rotas
│  ├─ UsuarioController.js
│  ├─ LivroController.js
│  ├─ EmprestimoController.js
│  └─ MultaController.js
│
├─ index.html                     # Página principal do sistema
├─ login.html                     # Página de login
├─ style.css                      # Estilos da aplicação
├─ app.js                         # Entrada principal (servidor)
├─ config.js                      # Configurações do servidor
├─ package.json
└─ README.md
```

---

## 🚀 Como Rodar Localmente

Você precisará de **Node.js 16+** e **MySQL 5.7+**.

### Passo 1: Clone o Repositório

```powershell
git clone https://github.com/devjorre/Biblioteca.git
cd Biblioteca
```

### Passo 2: Configure o Banco de Dados

1. Inicie o MySQL (XAMPP, WAMP ou serviço standalone)

2. Execute o script SQL:

```sql
CREATE DATABASE IF NOT EXISTS biblioteca_db;
=======
Sistema de Biblioteca Universitária 📚
Projeto full-stack de um sistema de gerenciamento de biblioteca para fins acadêmicos. Inclui frontend HTML/CSS/JavaScript e backend Node.js + Express com autenticação JWT, CRUD de usuários, livros, empréstimos e multas.
📋 Sobre o Projeto

Frontend: HTML5 + CSS3 + JavaScript (Vanilla)
Backend: Node.js + Express + JavaScript
Autenticação: JWT + bcryptjs (hash de senhas)
Banco de Dados: MySQL
Arquitetura: MVC com padrão DAO (Data Access Object)
Perfis: Administrador/Bibliotecário

🏗️ Estrutura do Repositório
Biblioteca/
├─ backend/
│  ├─ DAO/                        # Data Access Objects
│  │  ├─ UsuarioDAO.js
│  │  ├─ LivroDAO.js
│  │  ├─ EmprestimoDAO.js
│  │  └─ MultaDAO.js
│  ├─ services/                   # Lógica de negócio
│  │  ├─ UsuarioService.js
│  │  ├─ LivroService.js
│  │  ├─ EmprestimoService.js
│  │  └─ MultaService.js
│  ├─ controllers/                # Controladores das rotas
│  │  ├─ UsuarioController.js
│  │  ├─ LivroController.js
│  │  ├─ EmprestimoController.js
│  │  └─ MultaController.js
│  ├─ config.js                   # Configurações do servidor
│  ├─ app.js                      # Entrada principal
│  └─ package.json
│
├─ frontend/
│  ├─ index.html                  # Página principal do sistema
│  ├─ login.html                  # Página de login
│  ├─ style.css                   # Estilos da aplicação
│  └─ assets/                     # Imagens e recursos
│
├─ database/
│  └─ schema.sql                  # Script de criação do banco
│
└─ README.md
🚀 Como Rodar Localmente
Você precisará de Node.js 16+ e MySQL 5.7+.
Passo 1: Clone o Repositório
bashgit clone https://github.com/devjorre/Biblioteca.git
cd Biblioteca
Passo 2: Configurar o Banco de Dados

Inicie o MySQL (XAMPP, WAMP ou standalone)
Crie o banco de dados:

sqlCREATE DATABASE IF NOT EXISTS biblioteca_db;
>>>>>>> 96471f6a9b5ac935b0b000555717fd03b1636afe
USE biblioteca_db;

-- Tabela de Usuários
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    matricula VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20)
);

-- Tabela de Livros
CREATE TABLE livros (
    id_livro INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    ano_publicacao INT,
    categoria VARCHAR(50),
    disponivel BOOLEAN DEFAULT TRUE
);

-- Tabela de Empréstimos
CREATE TABLE emprestimos (
    id_emprestimo INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_livro INT NOT NULL,
    data_retirada DATE NOT NULL,
    data_prevista_devolucao DATE NOT NULL,
    data_devolucao DATE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_livro) REFERENCES livros(id_livro)
);

-- Tabela de Multas
CREATE TABLE multas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_emprestimo INT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    pago BOOLEAN DEFAULT FALSE,
    forma_pagamento VARCHAR(50),
    FOREIGN KEY (id_emprestimo) REFERENCES emprestimos(id_emprestimo)
);
<<<<<<< HEAD
```

### Passo 3: Instale as Dependências

```powershell
npm install
```

### Passo 4: Configure as Variáveis

Edite o arquivo `config.js`:

```javascript
module.exports = {
=======
Passo 3: Configurar o Backend

Navegue até a pasta raiz:

bashcd Biblioteca

Instale as dependências:

bashnpm install

Configure o arquivo config.js:

javascriptmodule.exports = {
>>>>>>> 96471f6a9b5ac935b0b000555717fd03b1636afe
  database: {
    host: 'localhost',
    user: 'root',           // Seu usuário MySQL
    password: '',           // Sua senha MySQL
    database: 'biblioteca_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  },
  server: {
    port: 3000
  }
};
<<<<<<< HEAD
```

### Passo 5: Inicie o Servidor

```powershell
node app.js
```

O backend estará disponível em `http://localhost:3000`.

### Passo 6: Acesse o Sistema

Abra no navegador:
```
http://localhost:3000/login.html
```

---

## 👥 Usuários de Teste

Você pode criar usuários através da interface de cadastro após fazer login no sistema.

**Credenciais padrão para teste**:
- Crie seu primeiro usuário pela interface de cadastro
- Use o sistema de login para acessar

---

## 📡 Endpoints da API

Base: `http://localhost:3000/api`

### Usuários

- `GET /api/usuarios` — Listar usuários
- `GET /api/usuarios/:id` — Obter usuário por ID
- `POST /api/usuarios` — Criar usuário
- `PUT /api/usuarios/:id` — Atualizar usuário
- `DELETE /api/usuarios/:id` — Deletar usuário
- `GET /api/usuarios/buscar` — Buscar usuário por nome

### Livros

- `GET /api/livros` — Listar livros
- `GET /api/livros/:id` — Obter livro por ID
- `GET /api/livros/disponiveis` — Listar livros disponíveis
- `POST /api/livros` — Criar livro
- `PUT /api/livros/:id` — Atualizar livro
- `DELETE /api/livros/:id` — Deletar livro

### Empréstimos

- `GET /api/emprestimos` — Listar empréstimos
- `GET /api/emprestimos/:id` — Obter empréstimo por ID
- `GET /api/emprestimos/ativos` — Listar empréstimos ativos
- `POST /api/emprestimos` — Criar empréstimo
- `PUT /api/emprestimos/:id/devolver` — Realizar devolução
- `DELETE /api/emprestimos/:id` — Deletar empréstimo

### Multas

- `GET /api/multas` — Listar multas
- `GET /api/multas/:id` — Obter multa por ID
- `POST /api/multas` — Criar multa
- `PUT /api/multas/:id` — Atualizar multa
- `PUT /api/multas/:id/pagar` — Registrar pagamento
- `DELETE /api/multas/:id` — Deletar multa

---

## 📊 Modelo de Dados

### Usuario
```javascript
{
=======

Inicie o servidor:

bashnode app.js
O backend estará disponível em http://localhost:3000.
Passo 4: Acessar o Frontend

Abra o arquivo index.html ou login.html diretamente no navegador
Ou utilize um servidor local:

bash# Com VS Code: Live Server extension
# Ou com Python:
python -m http.server 8080

Acesse: http://localhost:8080/login.html

👥 Usuários de Teste
Após popular o banco, você pode criar usuários através da interface de cadastro.
Credenciais padrão para teste:

Email: admin@biblioteca.com
Senha: admin123

📡 Endpoints da API
Base: http://localhost:3000/api
Usuários
MétodoEndpointDescriçãoGET/api/usuariosListar todos os usuáriosPOST/api/usuariosCriar novo usuárioGET/api/usuarios/:idObter usuário por IDPUT/api/usuarios/:idAtualizar usuárioDELETE/api/usuarios/:idDeletar usuárioGET/api/usuarios/buscarBuscar usuário por nome
Livros
MétodoEndpointDescriçãoGET/api/livrosListar todos os livrosPOST/api/livrosCriar novo livroGET/api/livros/:idObter livro por IDPUT/api/livros/:idAtualizar livroDELETE/api/livros/:idDeletar livroGET/api/livros/disponiveisListar livros disponíveis
Empréstimos
MétodoEndpointDescriçãoGET/api/emprestimosListar todos os empréstimosPOST/api/emprestimosCriar novo empréstimoGET/api/emprestimos/:idObter empréstimo por IDPUT/api/emprestimos/:id/devolverRealizar devoluçãoDELETE/api/emprestimos/:idDeletar empréstimoGET/api/emprestimos/ativosListar empréstimos ativos
Multas
MétodoEndpointDescriçãoGET/api/multasListar todas as multasPOST/api/multasCriar nova multaGET/api/multas/:idObter multa por IDPUT/api/multas/:idAtualizar multaPUT/api/multas/:id/pagarRegistrar pagamentoDELETE/api/multas/:idDeletar multa
📊 Modelo de Dados
Usuario
javascript{
>>>>>>> 96471f6a9b5ac935b0b000555717fd03b1636afe
  id_usuario: number
  nome: string
  matricula: string
  email: string
  telefone: string
}
<<<<<<< HEAD
```

### Livro
```javascript
{
=======
Livro
javascript{
>>>>>>> 96471f6a9b5ac935b0b000555717fd03b1636afe
  id_livro: number
  titulo: string
  autor: string
  ano_publicacao: number
  categoria: string
  disponivel: boolean
}
<<<<<<< HEAD
```

### Emprestimo
```javascript
{
=======
Emprestimo
javascript{
>>>>>>> 96471f6a9b5ac935b0b000555717fd03b1636afe
  id_emprestimo: number
  id_usuario: number
  id_livro: number
  data_retirada: date
  data_prevista_devolucao: date
  data_devolucao: date | null
}
<<<<<<< HEAD
```

### Multa
```javascript
{
=======
Multa
javascript{
>>>>>>> 96471f6a9b5ac935b0b000555717fd03b1636afe
  id: number
  id_emprestimo: number
  valor: decimal
  pago: boolean
  forma_pagamento: string | null
}
<<<<<<< HEAD
```

---

## 🔐 Variáveis de Ambiente

### Backend (`config.js`)
```javascript
{
=======
🔐 Variáveis de Ambiente
Backend (config.js)
javascript{
>>>>>>> 96471f6a9b5ac935b0b000555717fd03b1636afe
  database: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'biblioteca_db'
  },
  server: {
    port: 3000
  }
}
<<<<<<< HEAD
```

---

## 📝 Funcionalidades Implementadas

- ✅ Sistema de autenticação com validação
- ✅ CRUD completo de usuários
- ✅ CRUD completo de livros
- ✅ Sistema de empréstimos com controle de disponibilidade
- ✅ Sistema de multas automático (atraso)
- ✅ Busca em tempo real (usuários, livros, empréstimos, multas)
- ✅ Dashboard com estatísticas
- ✅ Controle de devolução com cálculo automático de multas
- ✅ Sistema de pagamento de multas (dinheiro, PIX, cartão)
- ✅ Validação de dados no frontend e backend
- ✅ Interface responsiva e moderna
- ✅ Arquitetura MVC com padrão DAO

---

## 🎯 Próximos Passos (Sugestões)

- [ ] Adicionar autenticação JWT
- [ ] Implementar sistema de reservas de livros
- [ ] Criar relatórios em PDF
- [ ] Adicionar notificações por email
- [ ] Implementar histórico de empréstimos por usuário
- [ ] Criar dashboard com gráficos (Chart.js)
- [ ] Adicionar sistema de renovação de empréstimos
- [ ] Implementar busca avançada com filtros
- [ ] Adicionar testes automatizados (Jest)
- [ ] Implementar CI/CD com GitHub Actions

---

## 🛠️ Desenvolvimento

Instale dependências:
```powershell
npm install
```

Inicie o servidor em modo desenvolvimento:
```powershell
node app.js
```

Ou com nodemon para hot reload:
```powershell
npx nodemon app.js
```

---

## Scripts úteis

- `node app.js` — inicia servidor
- `npx nodemon app.js` — inicia com hot reload
- `npm test` — executa testes (se existir)

---

## 📚 Notas Importantes

- Em desenvolvimento, o CORS está habilitado para todas as origens
- Em produção, configure CORS adequadamente
- O sistema calcula multas automaticamente em caso de atraso (R$ 2,00/dia)
- Livros devolvidos com atraso geram multas pendentes automaticamente
- O telefone aceita apenas números (validação implementada)
- Validação de ID de empréstimo ao criar multas

---

## Detalhamento Técnico (comandos & exemplos)

### Estrutura de arquivos importantes
```
=======
📝 Funcionalidades Implementadas
✅ Sistema de autenticação com validação
✅ CRUD completo de usuários
✅ CRUD completo de livros
✅ Sistema de empréstimos com controle de disponibilidade
✅ Sistema de multas automático (atraso)
✅ Busca em tempo real (usuários, livros, empréstimos, multas)
✅ Dashboard com estatísticas
✅ Controle de devolução com cálculo automático de multas
✅ Sistema de pagamento de multas
✅ Validação de dados no frontend e backend
✅ Interface responsiva e moderna
✅ Arquitetura MVC com padrão DAO
🎯 Próximos Passos (Sugestões)

 Adicionar sistema de reservas de livros
 Implementar relatórios em PDF
 Criar sistema de notificações por email
 Adicionar autenticação com diferentes níveis de acesso
 Implementar histórico de empréstimos por usuário
 Criar dashboard com gráficos (Chart.js)
 Adicionar sistema de renovação de empréstimos
 Implementar busca avançada com filtros
 Criar API de integração com sistemas externos
 Adicionar testes automatizados (Jest)

🛠️ Desenvolvimento
Instalar dependências
bashnpm install
Iniciar servidor em modo desenvolvimento
bashnode app.js
# ou com nodemon para hot reload:
npx nodemon app.js
Estrutura de arquivos importantes
>>>>>>> 96471f6a9b5ac935b0b000555717fd03b1636afe
app.js              # Servidor Express principal
config.js           # Configurações do banco e servidor
DAO/               # Camada de acesso aos dados
services/          # Lógica de negócio
controllers/       # Controladores de requisições
<<<<<<< HEAD
```

### Exemplos de requisições (curl)

**Registrar usuário:**
```bash
curl -X POST http://localhost:3000/api/usuarios \
=======
📚 Dependências Principais
json{
  "express": "^4.18.2",
  "mysql2": "^3.6.0",
  "cors": "^2.8.5",
  "body-parser": "^1.20.2",
  "dotenv": "^16.0.3"
}
🔧 Comandos Úteis
bash# Instalar dependências
npm install

# Iniciar servidor
node app.js

# Iniciar com nodemon (hot reload)
npx nodemon app.js

# Verificar porta em uso (Windows)
netstat -ano | findstr :3000

# Matar processo na porta 3000 (Windows)
taskkill /PID <PID> /F
📞 Exemplos de Requisições (curl)
Criar Usuário
bashcurl -X POST http://localhost:3000/api/usuarios \
>>>>>>> 96471f6a9b5ac935b0b000555717fd03b1636afe
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "matricula": "2024001",
    "email": "joao@email.com",
    "telefone": "85999999999"
  }'
<<<<<<< HEAD
```

**Criar livro:**
```bash
curl -X POST http://localhost:3000/api/livros \
=======
Criar Livro
bashcurl -X POST http://localhost:3000/api/livros \
>>>>>>> 96471f6a9b5ac935b0b000555717fd03b1636afe
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Clean Code",
    "autor": "Robert C. Martin",
    "ano_publicacao": 2008,
    "categoria": "Programação"
  }'
<<<<<<< HEAD
```

**Realizar empréstimo:**
```bash
curl -X POST http://localhost:3000/api/emprestimos \
=======
Realizar Empréstimo
bashcurl -X POST http://localhost:3000/api/emprestimos \
>>>>>>> 96471f6a9b5ac935b0b000555717fd03b1636afe
  -H "Content-Type: application/json" \
  -d '{
    "id_usuario": 1,
    "id_livro": 1,
    "dias_emprestimo": 7
  }'
<<<<<<< HEAD
```

**Devolver livro:**
```bash
curl -X PUT http://localhost:3000/api/emprestimos/1/devolver \
  -H "Content-Type: application/json"
```

**Pagar multa:**
```bash
curl -X PUT http://localhost:3000/api/multas/1/pagar \
  -H "Content-Type: application/json" \
  -d '{
    "forma_pagamento": "pix"
  }'
```

### Debug / logs

- O backend imprime requisições no console (`console.log(\`${req.method} ${req.path}\`)`)
- Mensagens de erro são exibidas no console para acompanhamento

### Solução de problemas comuns

**Erro: "Cannot find module 'express'"**
```powershell
npm install
```

**Erro: "ECONNREFUSED" ou "Access denied"**
- Verifique se o MySQL está rodando
- Confira usuário e senha no `config.js`
- Certifique-se de que o banco `biblioteca_db` foi criado

**Erro: "Port 3000 is already in use"**
```powershell
# Windows
=======
Devolver Livro
bashcurl -X PUT http://localhost:3000/api/emprestimos/1/devolver \
  -H "Content-Type: application/json"
🐛 Solução de Problemas Comuns
Erro: "Cannot find module 'express'"
bashnpm install
Erro: "ECONNREFUSED" ou "Access denied for user"

Verifique se o MySQL está rodando
Confira usuário e senha no config.js
Certifique-se de que o banco biblioteca_db foi criado

Erro: "Port 3000 is already in use"
bash# Windows
>>>>>>> 96471f6a9b5ac935b0b000555717fd03b1636afe
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
<<<<<<< HEAD
```

---

## Boas práticas / próximos passos sugeridos

- Implementar hash de senhas (bcrypt)
- Adicionar validação de entrada (Joi/Zod)
- Documentar API com OpenAPI/Swagger
- Escrever testes automatizados (Jest + Supertest)
- Implementar migrations do banco de dados
- Adicionar logs estruturados (Winston)

---

## 👨‍💻 Contribuição

1. Faça um fork do repositório
2. `git checkout -b feat/minha-feature`
3. Commit e push
4. Abra Pull Request

---

💡 **Autor:** José Guilherme ([devjorre](https://github.com/devjorre))  
📘 **Projeto acadêmico — Sistema de Biblioteca Universitária**
=======
Erro 404 ao acessar o frontend

Certifique-se de que está abrindo o arquivo login.html ou index.html
Use um servidor local (Live Server do VS Code ou Python http.server)

📌 Notas Importantes

Em desenvolvimento, o CORS está habilitado para todas as origens
Em produção, configure CORS adequadamente
As senhas devem ser armazenadas com hash (implementação futura)
O sistema calcula multas automaticamente em caso de atraso (R$ 2,00/dia)
Livros devolvidos com atraso geram multas pendentes automaticamente
O telefone aceita apenas números (validação implementada)

👨‍💻 Contribuição

Faça um fork do repositório
Crie uma branch para sua feature (git checkout -b feat/nova-funcionalidade)
Commit suas mudanças (git commit -m 'Adiciona nova funcionalidade')
Push para a branch (git push origin feat/nova-funcionalidade)
Abra um Pull Request

📄 Licença
Este projeto é de código aberto e está disponível para fins acadêmicos.
👥 Autores
José Guilherme - GitHub

💡 Projeto acadêmico — Desenvolvido para fins educacionais
📚 Sistema de Biblioteca Universitária — Gerenciamento completo de acervo e empréstimos
>>>>>>> 96471f6a9b5ac935b0b000555717fd03b1636afe
