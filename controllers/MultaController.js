
class MultaController {
  constructor(multaService) {
    this.multaService = multaService;
  }
async pagar(req, res) {
    try {
        const { id } = req.params;
        const { forma_pagamento } = req.body;

        const result = await this.multaService.pagar(id, forma_pagamento);
        res.json(result);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
}

  async pagar(req, res) {
    try {
      const { id } = req.params;
      await this.multaService.pagar(id);
      return res.json({ mensagem: 'Multa paga com sucesso' });
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const multa = await this.multaService.buscarPorId(id);
      return res.json(multa);
    } catch (error) {
      return res.status(404).json({ erro: error.message });
    }
  }

  async criar(req, res) {
    try {
      const result = await this.multaService.criar(req.body);
      return res.status(201).json({ message: "Multa cadastrada!", result });
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const result = await this.multaService.atualizar(req.params.id, req.body);
      return res.json({ message: "Multa atualizada!", result });
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async listarTodas(req, res) {
    try {
      const result = await this.multaService.listarTodas();
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const result = await this.multaService.deletar(req.params.id);
      return res.json({ message: "Multa deletada!", result });
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }
}



module.exports = MultaController;
