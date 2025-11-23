class UsuarioController {
  constructor(usuarioService) {
    this.usuarioService = usuarioService;
  }

  async listar(req, res) {
    try {
      const { nome } = req.query;

      if (nome) {
        const usuarios = await this.usuarioService.buscarPorNomeCompleto(nome);
        return res.json(usuarios);
      }

      const usuarios = await this.usuarioService.listarTodos();
      res.json(usuarios);

    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({ erro: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const usuario = await this.usuarioService.buscarPorId(req.params.id);
      res.json(usuario);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ erro: error.message });
      }
      res.status(400).json({ erro: error.message });
    }
  }

  async criar(req, res) {
    try {
      const resultado = await this.usuarioService.criar(req.body);
      res.status(201).json(resultado);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      if (error.message.includes('já cadastrada')) {
        return res.status(400).json({ erro: error.message });
      }
      res.status(400).json({ erro: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const resultado = await this.usuarioService.atualizar(req.params.id, req.body);
      res.json(resultado);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ erro: error.message });
      }
      res.status(400).json({ erro: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const resultado = await this.usuarioService.deletar(req.params.id);
      res.json(resultado);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ erro: error.message });
      }
      res.status(400).json({ erro: error.message });
    }
  }
}

module.exports = UsuarioController;
