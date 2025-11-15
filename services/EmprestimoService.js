const Emprestimo = require('../models/Emprestimo');

class EmprestimoService {
  constructor(emprestimoDAO, livroDAO) {
    this.emprestimoDAO = emprestimoDAO;
    this.livroDAO = livroDAO;
  }


  async listarTodos() {
    try {
      return await this.emprestimoDAO.listarTodos();
    } catch (error) {
      throw new Error(`Erro ao listar empréstimos: ${error.message}`);
    }
  }

 
  async listarAtivos() {
    try {
      return await this.emprestimoDAO.listarAtivos();
    } catch (error) {
      throw new Error(`Erro ao listar empréstimos ativos: ${error.message}`);
    }
  }


  async buscarPorId(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error('ID inválido');
      }
      
      const emprestimo = await this.emprestimoDAO.buscarPorId(id);
      if (!emprestimo) {
        throw new Error('Empréstimo não encontrado');
      }
      
      return emprestimo;
    } catch (error) {
      throw new Error(`Erro ao buscar empréstimo: ${error.message}`);
    }
  }


  async realizar(dados) {
    try {
      
      Emprestimo.validar(dados.id_usuario, dados.id_livro);
      
     
      const livro = await this.livroDAO.buscarPorId(dados.id_livro);
      if (!livro || !livro.estaDisponivel()) {
        throw new Error('Livro não está disponível');
      }
      
    
      const dataRetirada = new Date();
      const dataPrevistaDevolucao = new Date(dataRetirada);
      dataPrevistaDevolucao.setDate(dataPrevistaDevolucao.getDate() + (dados.dias_emprestimo || 7));
      
     
      const emprestimo = new Emprestimo(
        null,
        dados.id_usuario,
        dados.id_livro,
        dataRetirada.toISOString().split('T')[0],
        dataPrevistaDevolucao.toISOString().split('T')[0],
        null,
        0
      );
      
      
      await this.emprestimoDAO.criar(emprestimo);
      
    
      await this.livroDAO.atualizarDisponibilidade(dados.id_livro, false);
      
      return { mensagem: 'Empréstimo realizado com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao realizar empréstimo: ${error.message}`);
    }
  }

 
  async devolver(id) {
    try {
      
      if (!id || isNaN(id)) {
        throw new Error('ID inválido');
      }
      
      
      const emprestimo = await this.emprestimoDAO.buscarPorId(id);
      if (!emprestimo) {
        throw new Error('Empréstimo não encontrado');
      }
      
    
      const dataDevolucao = new Date();
      const dataPrevista = new Date(emprestimo.data_prevista_devolucao);
      let multa = 0;
      
      if (dataDevolucao > dataPrevista) {
        const diasAtraso = Math.floor((dataDevolucao - dataPrevista) / (1000 * 60 * 60 * 24));
        multa = diasAtraso * 1.00; // R$ 1,00 por dia de atraso
      }
      
      
      await this.emprestimoDAO.atualizarDevolucao(
        id,
        dataDevolucao.toISOString().split('T')[0],
        multa
      );
      
     
      await this.livroDAO.atualizarDisponibilidade(emprestimo.id_livro, true);
      
      return { mensagem: 'Livro devolvido com sucesso', multa: multa };
    } catch (error) {
      throw new Error(`Erro ao devolver livro: ${error.message}`);
    }
  }


  async deletar(id) {
    try {
   
      if (!id || isNaN(id)) {
        throw new Error('ID inválido');
      }
      
   
      const emprestimo = await this.emprestimoDAO.buscarPorId(id);
      if (!emprestimo) {
        throw new Error('Empréstimo não encontrado');
      }
      
      await this.emprestimoDAO.deletar(id);
      
      return { mensagem: 'Empréstimo deletado com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao deletar empréstimo: ${error.message}`);
    }
  }
}
module.exports = EmprestimoService;