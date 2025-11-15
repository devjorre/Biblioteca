class EmprestimoController {
  constructor(emprestimoService) {
    this.emprestimoService = emprestimoService;
  }

  // Listar todos os empréstimos
  async listar(req, res) {
    try {
      const emprestimos = await this.emprestimoService.listarTodos();
      res.json(emprestimos);
    } catch (error) {
      console.error('Erro ao listar empréstimos:', error);
      res.status(500).json({ erro: error.message });
    }
  }

  // Listar empréstimos ativos
  async listarAtivos(req, res) {
    try {
      const emprestimos = await this.emprestimoService.listarAtivos();
      res.json(emprestimos);
    } catch (error) {
      console.error('Erro ao listar empréstimos ativos:', error);
      res.status(500).json({ erro: error.message });
    }
  }

  // Buscar empréstimo por ID
  async buscarPorId(req, res) {
    try {
      const emprestimo = await this.emprestimoService.buscarPorId(req.params.id);
      res.json(emprestimo);
    } catch (error) {
      console.error('Erro ao buscar empréstimo:', error);
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ erro: error.message });
      }
      res.status(400).json({ erro: error.message });
    }
  }

  // Realizar novo empréstimo
  async realizar(req, res) {
    try {
      const resultado = await this.emprestimoService.realizar(req.body);
      res.status(201).json(resultado);
    } catch (error) {
      console.error('Erro ao realizar empréstimo:', error);
      res.status(400).json({ erro: error.message });
    }
  }

  // Devolver livro
  async devolver(req, res) {
    try {
      const resultado = await this.emprestimoService.devolver(req.params.id);
      res.json(resultado);
    } catch (error) {
      console.error('Erro ao devolver livro:', error);
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ erro: error.message });
      }
      res.status(400).json({ erro: error.message });
    }
  }

  // Deletar empréstimo
  async deletar(req, res) {
    try {
      const resultado = await this.emprestimoService.deletar(req.params.id);
      res.json(resultado);
    } catch (error) {
      console.error('Erro ao deletar empréstimo:', error);
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ erro: error.message });
      }
      res.status(400).json({ erro: error.message });
    }
  }
}
module.exports = EmprestimoController;
