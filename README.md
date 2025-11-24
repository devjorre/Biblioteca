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
```

### Passo 3: Instale as Dependências

```powershell
npm install
```

### Passo 4: Configure as Variáveis

Edite o arquivo `config.js`:

```javascript
module.exports = {
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
  id_usuario: number
  nome: string
  matricula: string
  email: string
  telefone: string
}
```

### Livro
```javascript
{
  id_livro: number
  titulo: string
  autor: string
  ano_publicacao: number
  categoria: string
  disponivel: boolean
}
```

### Emprestimo
```javascript
{
  id_emprestimo: number
  id_usuario: number
  id_livro: number
  data_retirada: date
  data_prevista_devolucao: date
  data_devolucao: date | null
}
```

### Multa
```javascript
{
  id: number
  id_emprestimo: number
  valor: decimal
  pago: boolean
  forma_pagamento: string | null
}
```

---

## 🔐 Variáveis de Ambiente

### Backend (`config.js`)
```javascript
{
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
app.js              # Servidor Express principal
config.js           # Configurações do banco e servidor
DAO/               # Camada de acesso aos dados
services/          # Lógica de negócio
controllers/       # Controladores de requisições
```

### Exemplos de requisições (curl)

**Registrar usuário:**
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "matricula": "2024001",
    "email": "joao@email.com",
    "telefone": "85999999999"
  }'
```

**Criar livro:**
```bash
curl -X POST http://localhost:3000/api/livros \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Clean Code",
    "autor": "Robert C. Martin",
    "ano_publicacao": 2008,
    "categoria": "Programação"
  }'
```

**Realizar empréstimo:**
```bash
curl -X POST http://localhost:3000/api/emprestimos \
  -H "Content-Type: application/json" \
  -d '{
    "id_usuario": 1,
    "id_livro": 1,
    "dias_emprestimo": 7
  }'
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
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
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