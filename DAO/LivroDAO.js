const Livro = require('../models/Livro');

class LivroDAO {
  constructor(pool) {
    this.pool = pool;
  }

  // Listar todos os livros
  async listarTodos() {
    try {
      const connection = await this.pool.getConnection();
      const [livros] = await connection.query('SELECT * FROM livro');
      connection.release();
      
      return livros.map(l => new Livro(l.id_livro, l.titulo, l.autor, l.ano_publicacao, l.categoria, l.isbn, l.disponivel));
    } catch (error) {
      throw new Error(`Erro ao listar livros: ${error.message}`);
    }
  }

  // Listar apenas livros disponíveis
  async listarDisponiveis() {
    try {
      const connection = await this.pool.getConnection();
      const [livros] = await connection.query('SELECT * FROM livro WHERE disponivel = true');
      connection.release();
      
      return livros.map(l => new Livro(l.id_livro, l.titulo, l.autor, l.ano_publicacao, l.categoria, l.isbn, l.disponivel));
    } catch (error) {
      throw new Error(`Erro ao listar livros disponíveis: ${error.message}`);
    }
  }

  // Buscar livro por ID
  async buscarPorId(id) {
    try {
      const connection = await this.pool.getConnection();
      const [livros] = await connection.query('SELECT * FROM livro WHERE id_livro = ?', [id]);
      connection.release();
      
      if (livros.length === 0) {
        return null;
      }
      
      const l = livros[0];
      return new Livro(l.id_livro, l.titulo, l.autor, l.ano_publicacao, l.categoria, l.isbn, l.disponivel);
    } catch (error) {
      throw new Error(`Erro ao buscar livro: ${error.message}`);
    }
  }

  // Criar novo livro
  async criar(livro) {
    try {
      const connection = await this.pool.getConnection();
      await connection.query(
        'INSERT INTO livro (titulo, autor, ano_publicacao, categoria, isbn, disponivel) VALUES (?, ?, ?, ?, ?, true)',
        [livro.titulo, livro.autor, livro.ano_publicacao, livro.categoria, livro.isbn]
      );
      connection.release();
      
      return true;
    } catch (error) {
      throw new Error(`Erro ao criar livro: ${error.message}`);
    }
  }

  // Atualizar livro
  async atualizar(id, livro) {
    try {
      const connection = await this.pool.getConnection();
      await connection.query(
        'UPDATE livro SET titulo = ?, autor = ?, categoria = ?, disponivel = ? WHERE id_livro = ?',
        [livro.titulo, livro.autor, livro.categoria, livro.disponivel, id]
      );
      connection.release();
      
      return true;
    } catch (error) {
      throw new Error(`Erro ao atualizar livro: ${error.message}`);
    }
  }

  // Deletar livro
  async deletar(id) {
    try {
      const connection = await this.pool.getConnection();
      await connection.query('DELETE FROM livro WHERE id_livro = ?', [id]);
      connection.release();
      
      return true;
    } catch (error) {
      throw new Error(`Erro ao deletar livro: ${error.message}`);
    }
  }

  // Atualizar disponibilidade
  async atualizarDisponibilidade(id, disponivel) {
    try {
      const connection = await this.pool.getConnection();
      await connection.query(
        'UPDATE livro SET disponivel = ? WHERE id_livro = ?',
        [disponivel, id]
      );
      connection.release();
      
      return true;
    } catch (error) {
      throw new Error(`Erro ao atualizar disponibilidade: ${error.message}`);
    }
  }
}