const Usuario = require('../models/Usuario');

class UsuarioDAO {
  constructor(pool) {
    this.pool = pool;
  }

  // Listar todos os usuários
  async listarTodos() {
    try {
      const connection = await this.pool.getConnection();
      const [usuarios] = await connection.query('SELECT * FROM usuario');
      connection.release();
      
      return usuarios.map(u => new Usuario(u.id_usuario, u.nome, u.matricula, u.email, u.telefone));
    } catch (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
  }

  // Buscar usuário por ID
  async buscarPorId(id) {
    try {
      const connection = await this.pool.getConnection();
      const [usuarios] = await connection.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
      connection.release();
      
      if (usuarios.length === 0) {
        return null;
      }
      
      const u = usuarios[0];
      return new Usuario(u.id_usuario, u.nome, u.matricula, u.email, u.telefone);
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }

  // Buscar usuário por matrícula
  async buscarPorMatricula(matricula) {
    try {
      const connection = await this.pool.getConnection();
      const [usuarios] = await connection.query('SELECT * FROM usuario WHERE matricula = ?', [matricula]);
      connection.release();
      
      if (usuarios.length === 0) {
        return null;
      }
      
      const u = usuarios[0];
      return new Usuario(u.id_usuario, u.nome, u.matricula, u.email, u.telefone);
    } catch (error) {
      throw new Error(`Erro ao buscar usuário por matrícula: ${error.message}`);
    }
  }

  // Criar novo usuário
  async criar(usuario) {
    try {
      const connection = await this.pool.getConnection();
      await connection.query(
        'INSERT INTO usuario (nome, matricula, email, telefone) VALUES (?, ?, ?, ?)',
        [usuario.nome, usuario.matricula, usuario.email, usuario.telefone]
      );
      connection.release();
      
      return true;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Matrícula ou email já existem');
      }
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  // Atualizar usuário
  async atualizar(id, usuario) {
    try {
      const connection = await this.pool.getConnection();
      await connection.query(
        'UPDATE usuario SET nome = ?, email = ?, telefone = ? WHERE id_usuario = ?',
        [usuario.nome, usuario.email, usuario.telefone, id]
      );
      connection.release();
      
      return true;
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }

  // Deletar usuário
  async deletar(id) {
    try {
      const connection = await this.pool.getConnection();
      await connection.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
      connection.release();
      
      return true;
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  }
}