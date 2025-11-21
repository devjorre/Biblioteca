// services/EmprestimoService.js
const Emprestimo = require('../models/Emprestimo');

class EmprestimoService {
  constructor(emprestimoDAO, livroDAO, multaDAO) {
    this.emprestimoDAO = emprestimoDAO;
    this.livroDAO = livroDAO;
    this.multaDAO = multaDAO; // usado para criar registro de multa quando necessário
  }

  async listarTodos() {
    return await this.emprestimoDAO.listarTodos();
  }

  async listarAtivos() {
    return await this.emprestimoDAO.listarAtivos();
  }

  async buscarPorId(id) {
    if (!id || isNaN(id)) throw new Error('ID inválido');
    const emprestimo = await this.emprestimoDAO.buscarPorId(id);
    if (!emprestimo) throw new Error('Empréstimo não encontrado');
    return emprestimo;
  }

  async realizar(dados) {
    if (!dados.id_usuario || !dados.id_livro) {
      throw new Error("Dados inválidos: id_usuario e id_livro são obrigatórios");
    }

    const livro = await this.livroDAO.buscarPorId(dados.id_livro);
    if (!livro || livro.disponivel === 0 || livro.disponivel === false) {
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
      null
    );

    const result = await this.emprestimoDAO.criar(emprestimo);

    // marca livro indisponível
    await this.livroDAO.atualizarDisponibilidade(dados.id_livro, false);

    return { mensagem: 'Empréstimo realizado com sucesso', id_emprestimo: result.insertId };
  }

  async devolver(id) {
    if (!id || isNaN(id)) throw new Error('ID inválido');

    const emprestimo = await this.emprestimoDAO.buscarPorId(id);
    if (!emprestimo) throw new Error('Empréstimo não encontrado');

    const dataDevolucao = new Date();
    const dataPrevista = new Date(emprestimo.data_prevista_devolucao);
    let valorMulta = 0;

    if (dataDevolucao > dataPrevista) {
      const diasAtraso = Math.floor((dataDevolucao - dataPrevista) / (1000 * 60 * 60 * 24));
      valorMulta = diasAtraso * 1.00; // valor por dia (ajuste se desejar)
    }

    // se houve multa > 0, criar registro na tabela multas
    let id_multa = null;
    if (valorMulta > 0) {
      const multaObj = {
        id_emprestimo: id,
        valor: valorMulta,
        forma_pagamento: null,
        pago: false
      };
      const result = await this.multaDAO.criar(multaObj);
      id_multa = result.insertId;
    }

    // atualizar devolução e relacionar id_multa (nullable)
    await this.emprestimoDAO.atualizarDevolucao(
      id,
      dataDevolucao.toISOString().split('T')[0],
      id_multa
    );

    // marcar livro disponível
    await this.livroDAO.atualizarDisponibilidade(emprestimo.id_livro, true);

    return { mensagem: 'Livro devolvido com sucesso', multa: valorMulta, id_multa };
  }

  async deletar(id) {
    if (!id || isNaN(id)) throw new Error('ID inválido');

    const emprestimo = await this.emprestimoDAO.buscarPorId(id);
    if (!emprestimo) throw new Error('Empréstimo não encontrado');

    // opcional: remover multa associada antes de deletar emprestimo
    if (emprestimo.id_multa) {
      await this.multaDAO.deletar(emprestimo.id_multa);
    }

    await this.emprestimoDAO.deletar(id);
    return { mensagem: 'Empréstimo deletado com sucesso' };
  }
}

module.exports = EmprestimoService;
