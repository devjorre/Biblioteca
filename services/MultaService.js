// services/MultaService.js
class MultaService {
  constructor(multaDAO) {
    this.multaDAO = multaDAO;
  }

  async pagar(id) {
    const result = await this.multaDAO.pagar(id);
    if (!result || result.affectedRows === 0) {
      throw new Error('Multa não encontrada');
    }
    return { mensagem: 'Multa paga com sucesso' };
  }

  async buscarPorId(id) {
    const rows = await this.multaDAO.buscarPorId(id);
    if (!rows || rows.length === 0) {
      throw new Error('Multa não encontrada');
    }
    return rows[0];
  }

  async criar(data) {
    // Validações simples
    if (!data.id_emprestimo || !data.valor) {
      throw new Error('id_emprestimo e valor são obrigatórios');
    }
    const result = await this.multaDAO.criar(data);
    return result;
  }

  async atualizar(id, data) {
    const result = await this.multaDAO.atualizar(id, data);
    return result;
  }

  async listarTodas() {
    return await this.multaDAO.listarTodas();
  }

  async deletar(id) {
    const result = await this.multaDAO.deletar(id);
    return result;
  }
}

module.exports = MultaService;
