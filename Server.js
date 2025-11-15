const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');


const UsuarioDAO = require('./DAO/UsuarioDAO');
const LivroDAO = require('./DAO/LivroDAO');
const EmprestimoDAO = require('./DAO/EmprestimoDAO');



const UsuarioService = require('./services/UsuarioService');
const LivroService = require('./services/LivroService');
const EmprestimoService = require('./services/EmprestimoService');


const UsuarioController = require('./controllers/UsuarioController');
const LivroController = require('./controllers/LivroController');
const EmprestimoController = require('./controllers/EmprestimoController');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '19192719', 
  database: 'biblioteca',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


const usuarioDAO = new UsuarioDAO(pool);
const livroDAO = new LivroDAO(pool);
const emprestimoDAO = new EmprestimoDAO(pool);



const usuarioService = new UsuarioService(usuarioDAO);
const livroService = new LivroService(livroDAO);
const emprestimoService = new EmprestimoService(emprestimoDAO, livroDAO);


const usuarioController = new UsuarioController(usuarioService);
const livroController = new LivroController(livroService);
const emprestimoController = new EmprestimoController(emprestimoService);



app.get('/api/usuarios', (req, res) => usuarioController.listar(req, res));
app.get('/api/usuarios/:id', (req, res) => usuarioController.buscarPorId(req, res));
app.post('/api/usuarios', (req, res) => usuarioController.criar(req, res));
app.put('/api/usuarios/:id', (req, res) => usuarioController.atualizar(req, res));
app.delete('/api/usuarios/:id', (req, res) => usuarioController.deletar(req, res));


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



app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});