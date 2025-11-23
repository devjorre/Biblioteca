
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config.js');

const UsuarioDAO = require('./DAO/UsuarioDAO');
const LivroDAO = require('./DAO/LivroDAO');
const EmprestimoDAO = require('./DAO/EmprestimoDAO');
const MultaDAO = require("./DAO/MultaDAO");

const UsuarioService = require('./services/UsuarioService');
const LivroService = require('./services/LivroService');
const EmprestimoService = require('./services/EmprestimoService');
const MultaService = require('./services/MultaService');

const UsuarioController = require('./controllers/UsuarioController');
const LivroController = require('./controllers/LivroController');
const EmprestimoController = require('./controllers/EmprestimoController');
const MultaController = require('./controllers/MultaController');

const app = express();
const PORT = config.server.port;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});
const path = require("path");



app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});


let pool;
let usuarioController;
let livroController;
let emprestimoController;
let multaController;

async function inicializarBanco() {
  try {
    pool = await mysql.createPool(config.database);

    const conn = await pool.getConnection();
    await conn.query("SELECT 1");
    conn.release();

    console.log("✓ Banco conectado com sucesso.");
  } catch (err) {
    console.error("✗ Erro ao conectar ao banco:", err.message);
    process.exit(1);
  }
}

async function inicializarDependencias() {
  if (!pool) {
    console.error("✗ ERRO: pool está undefined na inicialização das dependências!");
    process.exit(1);
  }

  console.log("✓ Pool carregado, criando dependências...");

  const usuarioDAO = new UsuarioDAO(pool);
  const livroDAO = new LivroDAO(pool);
  const emprestimoDAO = new EmprestimoDAO(pool);
  const multaDAO = new MultaDAO(pool);

  const usuarioService = new UsuarioService(usuarioDAO);
  const livroService = new LivroService(livroDAO);
  
 
  const emprestimoService = new EmprestimoService(emprestimoDAO, livroDAO, multaDAO);

  const multaService = new MultaService(multaDAO);

  usuarioController = new UsuarioController(usuarioService);
  livroController = new LivroController(livroService);
  emprestimoController = new EmprestimoController(emprestimoService);
  multaController = new MultaController(multaService);

  console.log("✓ Dependências criadas com sucesso.");
}


function inicializarRotas() {

  app.get('/api/usuarios', (req, res) => usuarioController.listar(req, res));
  app.post('/api/usuarios', (req, res) => usuarioController.criar(req, res));
  app.get('/api/usuarios/:id', (req, res) => usuarioController.buscarPorId(req, res));
  app.put('/api/usuarios/:id', (req, res) => usuarioController.atualizar(req, res));
  app.delete('/api/usuarios/:id', (req, res) => usuarioController.deletar(req, res));
app.get('/api/usuarios/buscar', (req, res) => usuarioController.buscarPorNome(req, res));


  app.get('/api/livros', (req, res) => livroController.listar(req, res));
  app.get('/api/livros/disponiveis', (req, res) => livroController.listarDisponiveis(req, res));
  app.post('/api/livros', (req, res) => livroController.criar(req, res));
  app.put('/api/livros/:id', (req, res) => livroController.atualizar(req, res));
  app.delete('/api/livros/:id', (req, res) => livroController.deletar(req, res));


  app.get('/api/emprestimos', (req, res) => emprestimoController.listar(req, res));
  app.get('/api/emprestimos/ativos', (req, res) => emprestimoController.listarAtivos(req, res));
  app.post('/api/emprestimos', (req, res) => emprestimoController.realizar(req, res));
  app.put('/api/emprestimos/:id/devolver', (req, res) => emprestimoController.devolver(req, res));
  app.delete('/api/emprestimos/:id', (req, res) => emprestimoController.deletar(req, res));

  
  app.get('/api/multas', (req, res) => multaController.listarTodas(req, res));
  app.get('/api/multas/:id', (req, res) => multaController.buscarPorId(req, res));
  app.post('/api/multas', (req, res) => multaController.criar(req, res));
  app.put('/api/multas/:id', (req, res) => multaController.atualizar(req, res));
  app.put('/api/multas/:id/pagar', (req, res) => multaController.pagar(req, res));
  app.delete('/api/multas/:id', (req, res) => multaController.deletar(req, res));

}

async function iniciarServidor() {
  await inicializarBanco();
  await inicializarDependencias();
  inicializarRotas();

  app.listen(PORT, () => {
    console.log(`\n✓ Servidor rodando em http://localhost:${PORT}`);
  });
}



iniciarServidor();
