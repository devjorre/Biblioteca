const Emprestimo = require('../models/Emprestimo');

class EmprestimoDAO {
  constructor(pool) {
    this.pool = pool;
  }

  // Listar todos os empréstimos
  async listarTodos() {
    try {
      const connection = await this.pool.getConnection();
      const [emprestimos] = await connection.query(`
        SELECT e.*, u.nome as usuario_nome, l.titulo as livro_titulo
        FROM emprestimo e
        JOIN usuario u ON e.id_usuario = u.id_usuario
        JOIN livro l ON e.id_livro = l.id_livro
      `);
      connection.release();
      
      return emprestimos;
    } catch (error) {
      throw new Error(`Erro ao listar empréstimos: ${error.message}`);
    }
  }

  // Listar empréstimos ativos (não devolvidos)
  async listarAtivos() {
    try {
      const connection = await this.pool.getConnection();
      const [emprestimos] = await connection.query(`
        SELECT e.*, u.nome as usuario_nome, l.titulo as livro_titulo
        FROM emprestimo e
        JOIN usuario u ON e.id_usuario = u.id_usuario
        JOIN livro l ON e.id_livro = l.id_livro
        WHERE e.data_devolucao IS NULL
      `);
      connection.release();
      
      return emprestimos;
    } catch (error) {
      throw new Error(`Erro ao listar empréstimos ativos: ${error.message}`);
    }
  }

  // Buscar empréstimo por ID
  async buscarPorId(id) {
    try {
      const connection = await this.pool.getConnection();
      const [emprestimos] = await connection.query('SELECT * FROM emprestimo WHERE id_emprestimo = ?', [id]);
      connection.release();
      
      if (emprestimos.length === 0) {
        return null;
      }
      
      const e = emprestimos[0];
      return new Emprestimo(
        e.id_emprestimo,
        e.id_usuario,
        e.id_livro,
        e.data_retirada,
        e.data_prevista_devolucao,
        e.data_devolucao,
        e.multa
      );
    } catch (error) {
      throw new Error(`Erro ao buscar empréstimo: ${error.message}`);
    }
  }

  // Criar novo empréstimo
  async criar(emprestimo) {
    try {
      const connection = await this.pool.getConnection();
      await connection.query(
        'INSERT INTO emprestimo (id_usuario, id_livro, data_retirada, data_prevista_devolucao, multa) VALUES (?, ?, ?, ?, 0)',
        [emprestimo.id_usuario, emprestimo.id_livro, emprestimo.data_retirada, emprestimo.data_prevista_devolucao]
      );
      connection.release();
      
      return true;
    } catch (error) {
      throw new Error(`Erro ao criar empréstimo: ${error.message}`);
    }
  }

  // Atualizar empréstimo (devolução)
  async atualizarDevolucao(id, dataDevolucao, multa) {
    try {
      const connection = await this.pool.getConnection();
      await connection.query(
        'UPDATE emprestimo SET data_devolucao = ?, multa = ? WHERE id_emprestimo = ?',
        [dataDevolucao, multa, id]
      );
      connection.release();
      
      return true;
    } catch (error) {
      throw new Error(`Erro ao atualizar empréstimo: ${error.message}`);
    }
  }

  // Deletar empréstimo
  async deletar(id) {
    try {
      const connection = await this.pool.getConnection();
      await connection.query('DELETE FROM emprestimo WHERE id_emprestimo = ?', [id]);
      connection.release();
      
      return true;
    } catch (error) {
      throw new Error(`Erro ao deletar empréstimo: ${error.message}`);
    }
  }
}