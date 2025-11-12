const Emprestimo = require('../models/Emprestimo');

class EmprestimoService {
  constructor(emprestimoDAO, livroDAO) {
    this.emprestimoDAO = emprestimoDAO;
    this.livroDAO = livroDAO;
  }

  // Listar todos os empréstimos
  async listarTodos() {
    try {
      return await this.emprestimoDAO.listarTodos();
    } catch (error) {
      throw new Error(`Erro ao listar empréstimos: ${error.message}`);
    }
  }

  // Listar empréstimos ativos
  async listarAtivos() {
    try {
      return await this.emprestimoDAO.listarAtivos();
    } catch (error) {
      throw new Error(`Erro ao listar empréstimos ativos: ${error.message}`);
    }
  }

  // Buscar empréstimo por ID
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

  // Realizar novo empréstimo
  async realizar(dados) {
    try {
      // Validar dados
      Emprestimo.validar(dados.id_usuario, dados.id_livro);
      
      // Verificar se livro está disponível
      const livro = await this.livroDAO.buscarPorId(dados.id_livro);
      if (!livro || !livro.estaDisponivel()) {
        throw new Error('Livro não está disponível');
      }
      
      // Calcular datas
      const dataRetirada = new Date();
      const dataPrevistaDevolucao = new Date(dataRetirada);
      dataPrevistaDevolucao.setDate(dataPrevistaDevolucao.getDate() + (dados.dias_emprestimo || 7));
      
      // Criar empréstimo
      const emprestimo = new Emprestimo(
        null,
        dados.id_usuario,
        dados.id_livro,
        dataRetirada.toISOString().split('T')[0],
        dataPrevistaDevolucao.toISOString().split('T')[0],
        null,
        0
      );
      
      // Salvar empréstimo
      await this.emprestimoDAO.criar(emprestimo);
      
      // Atualizar disponibilidade do livro
      await this.livroDAO.atualizarDisponibilidade(dados.id_livro, false);
      
      return { mensagem: 'Empréstimo realizado com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao realizar empréstimo: ${error.message}`);
    }
  }

  // Devolver livro
  async devolver(id) {
    try {
      // Validar ID
      if (!id || isNaN(id)) {
        throw new Error('ID inválido');
      }
      
      // Buscar empréstimo
      const emprestimo = await this.emprestimoDAO.buscarPorId(id);
      if (!emprestimo) {
        throw new Error('Empréstimo não encontrado');
      }
      
      // Calcular multa
      const dataDevolucao = new Date();
      const dataPrevista = new Date(emprestimo.data_prevista_devolucao);
      let multa = 0;
      
      if (dataDevolucao > dataPrevista) {
        const diasAtraso = Math.floor((dataDevolucao - dataPrevista) / (1000 * 60 * 60 * 24));
        multa = diasAtraso * 1.00; // R$ 1,00 por dia de atraso
      }
      
      // Atualizar empréstimo com devolução
      await this.emprestimoDAO.atualizarDevolucao(
        id,
        dataDevolucao.toISOString().split('T')[0],
        multa
      );
      
      // Atualizar disponibilidade do livro
      await this.livroDAO.atualizarDisponibilidade(emprestimo.id_livro, true);
      
      return { mensagem: 'Livro devolvido com sucesso', multa: multa };
    } catch (error) {
      throw new Error(`Erro ao devolver livro: ${error.message}`);
    }
  }

  // Deletar empréstimo
  async deletar(id) {
    try {
      // Validar ID
      if (!id || isNaN(id)) {
        throw new Error('ID inválido');
      }
      
      // Verificar se empréstimo existe
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