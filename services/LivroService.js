const Livro = require('../models/Livro');

class LivroService {
  constructor(livroDAO) {
    this.livroDAO = livroDAO;
  }

  // Listar todos os livros
  async listarTodos() {
    try {
      return await this.livroDAO.listarTodos();
    } catch (error) {
      throw new Error(`Erro ao listar livros: ${error.message}`);
    }
  }

  // Listar apenas livros disponíveis
  async listarDisponiveis() {
    try {
      return await this.livroDAO.listarDisponiveis();
    } catch (error) {
      throw new Error(`Erro ao listar livros disponíveis: ${error.message}`);
    }
  }

  // Buscar livro por ID
  async buscarPorId(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error('ID inválido');
      }
      
      const livro = await this.livroDAO.buscarPorId(id);
      if (!livro) {
        throw new Error('Livro não encontrado');
      }
      
      return livro;
    } catch (error) {
      throw new Error(`Erro ao buscar livro: ${error.message}`);
    }
  }

  // Criar novo livro
  async criar(dados) {
    try {
      // Validar dados
      Livro.validar(dados.titulo, dados.autor);
      
      // Criar novo livro
      const livro = new Livro(
        null,
        dados.titulo,
        dados.autor,
        dados.ano_publicacao,
        dados.categoria,
        dados.isbn,
        true
      );
      
      await this.livroDAO.criar(livro);
      
      return { mensagem: 'Livro criado com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao criar livro: ${error.message}`);
    }
  }

  // Atualizar livro
  async atualizar(id, dados) {
    try {
      // Validar ID
      if (!id || isNaN(id)) {
        throw new Error('ID inválido');
      }
      
      // Verificar se livro existe
      const livro = await this.livroDAO.buscarPorId(id);
      if (!livro) {
        throw new Error('Livro não encontrado');
      }
      
      // Atualizar dados
      livro.titulo = dados.titulo || livro.titulo;
      livro.autor = dados.autor || livro.autor;
      livro.categoria = dados.categoria || livro.categoria;
      if (dados.disponivel !== undefined) {
        livro.disponivel = dados.disponivel;
      }
      
      await this.livroDAO.atualizar(id, livro);
      
      return { mensagem: 'Livro atualizado com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao atualizar livro: ${error.message}`);
    }
  }


  async deletar(id) {
    try {

      if (!id || isNaN(id)) {
        throw new Error('ID inválido');
      }
      

      const livro = await this.livroDAO.buscarPorId(id);
      if (!livro) {
        throw new Error('Livro não encontrado');
      }
      
      await this.livroDAO.deletar(id);
      
      return { mensagem: 'Livro deletado com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao deletar livro: ${error.message}`);
    }
  }
}
module.exports = LivroService;
