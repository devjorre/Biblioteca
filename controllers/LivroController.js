class LivroController {
  constructor(livroService) {
    this.livroService = livroService;
  }


  async listar(req, res) {
    try {
      const livros = await this.livroService.listarTodos();
      res.json(livros);
    } catch (error) {
      console.error('Erro ao listar livros:', error);
      res.status(500).json({ erro: error.message });
    }
  }


  async listarDisponiveis(req, res) {
    try {
      const livros = await this.livroService.listarDisponiveis();
      res.json(livros);
    } catch (error) {
      console.error('Erro ao listar livros disponíveis:', error);
      res.status(500).json({ erro: error.message });
    }
  }


  async buscarPorId(req, res) {
    try {
      const livro = await this.livroService.buscarPorId(req.params.id);
      res.json(livro);
    } catch (error) {
      console.error('Erro ao buscar livro:', error);
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ erro: error.message });
      }
      res.status(400).json({ erro: error.message });
    }
  }


  async criar(req, res) {
    try {
      const resultado = await this.livroService.criar(req.body);
      res.status(201).json(resultado);
    } catch (error) {
      console.error('Erro ao criar livro:', error);
      res.status(400).json({ erro: error.message });
    }
  }


  async atualizar(req, res) {
    try {
      const resultado = await this.livroService.atualizar(req.params.id, req.body);
      res.json(resultado);
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ erro: error.message });
      }
      res.status(400).json({ erro: error.message });
    }
  }

  
  async deletar(req, res) {
    try {
      const resultado = await this.livroService.deletar(req.params.id);
      res.json(resultado);
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ erro: error.message });
      }
      res.status(400).json({ erro: error.message });
    }
  }
}
module.exports = LivroController;
