class MultaService {
  constructor(multaDAO) {
    this.multaDAO = multaDAO;
  }


  async pagar(id, forma_pagamento) {
    if (!forma_pagamento) {
      throw new Error("Forma de pagamento é obrigatória");
    }

    const result = await this.multaDAO.pagar(id, forma_pagamento);

    if (!result || result.affectedRows === 0) {
      throw new Error("Multa não encontrada");
    }

    return { mensagem: "Multa paga com sucesso!" };
  }


  async buscarPorId(id) {
    const rows = await this.multaDAO.buscarPorId(id);
    if (!rows || rows.length === 0) {
      throw new Error("Multa não encontrada");
    }
    return rows[0];
  }


  async criar(data) {
    if (!data.id_emprestimo || !data.valor) {
      throw new Error("id_emprestimo e valor são obrigatórios");
    }

    return await this.multaDAO.criar(data);
  }


  async atualizar(id, data) {
    return await this.multaDAO.atualizar(id, data);
  }


  async listarTodas() {
    return await this.multaDAO.listarTodas();
  }


  async deletar(id) {
    return await this.multaDAO.deletar(id);
  }


  calcularMulta(data_prevista, data_devolvida) {
    const hoje = data_devolvida ? new Date(data_devolvida) : new Date();
    const prevista = new Date(data_prevista);

    const diffMs = hoje - prevista;
    const diasAtraso = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diasAtraso <= 0) return 0;

    return diasAtraso * 10; 
  }
}

module.exports = MultaService;
