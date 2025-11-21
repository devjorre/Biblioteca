// DAO/EmprestimoDAO.js
const Emprestimo = require('../models/Emprestimo');

class EmprestimoDAO {
  constructor(pool) {
    this.pool = pool;
  }

  async listarTodos() {
    const conn = await this.pool.getConnection();
    try {
      const [rows] = await conn.query(`
        SELECT e.*, u.nome as usuario_nome, l.titulo as livro_titulo
        FROM emprestimo e
        JOIN usuario u ON e.id_usuario = u.id_usuario
        JOIN livro l ON e.id_livro = l.id_livro
        ORDER BY e.id_emprestimo DESC
      `);
      return rows;
    } finally {
      conn.release();
    }
  }

  async listarAtivos() {
    const conn = await this.pool.getConnection();
    try {
      const [rows] = await conn.query(`
        SELECT e.*, u.nome as usuario_nome, l.titulo as livro_titulo
        FROM emprestimo e
        JOIN usuario u ON e.id_usuario = u.id_usuario
        JOIN livro l ON e.id_livro = l.id_livro
        WHERE e.data_devolucao IS NULL
        ORDER BY e.id_emprestimo DESC
      `);
      return rows;
    } finally {
      conn.release();
    }
  }

  async buscarPorId(id) {
    const conn = await this.pool.getConnection();
    try {
      const [rows] = await conn.query('SELECT * FROM emprestimo WHERE id_emprestimo = ?', [id]);
      if (rows.length === 0) return null;
      const e = rows[0];
      return new Emprestimo(
        e.id_emprestimo,
        e.id_usuario,
        e.id_livro,
        e.data_retirada,
        e.data_prevista_devolucao,
        e.data_devolucao,
        e.id_multa // id da multa (nullable)
      );
    } finally {
      conn.release();
    }
  }

  async criar(emprestimo) {
    const conn = await this.pool.getConnection();
    try {
      const [result] = await conn.query(
        `INSERT INTO emprestimo (id_usuario, id_livro, data_retirada, data_prevista_devolucao, data_devolucao, id_multa)
         VALUES (?, ?, ?, ?, NULL, NULL)`,
        [emprestimo.id_usuario, emprestimo.id_livro, emprestimo.data_retirada, emprestimo.data_prevista_devolucao]
      );
      return { insertId: result.insertId };
    } finally {
      conn.release();
    }
  }

  async atualizarDevolucao(id, dataDevolucao, id_multa = null) {
    const conn = await this.pool.getConnection();
    try {
      const [result] = await conn.query(
        `UPDATE emprestimo SET data_devolucao = ?, id_multa = ? WHERE id_emprestimo = ?`,
        [dataDevolucao, id_multa, id]
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async deletar(id) {
    const conn = await this.pool.getConnection();
    try {
      const [result] = await conn.query('DELETE FROM emprestimo WHERE id_emprestimo = ?', [id]);
      return result;
    } finally {
      conn.release();
    }
  }
}

module.exports = EmprestimoDAO;
