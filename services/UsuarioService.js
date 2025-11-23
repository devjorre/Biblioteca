const Usuario = require('../models/Usuario');

class UsuarioService {
  constructor(usuarioDAO) {
    this.usuarioDAO = usuarioDAO;
  }

 
  async listarTodos() {
    try {
      return await this.usuarioDAO.listarTodos();
    } catch (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
  }


  async buscarPorId(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error('ID inválido');
      }
      
      const usuario = await this.usuarioDAO.buscarPorId(id);
      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }
      
      return usuario;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }


  async criar(dados) {
    try {
  
      Usuario.validar(dados.nome, dados.matricula, dados.email);

      const usuarioExistente = await this.usuarioDAO.buscarPorMatricula(dados.matricula);
      if (usuarioExistente) {
        throw new Error('Matrícula já cadastrada');
      }
      
    
      const usuario = new Usuario(null, dados.nome, dados.matricula, dados.email, dados.telefone);
      await this.usuarioDAO.criar(usuario);
      
      return { mensagem: 'Usuário criado com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }


  async atualizar(id, dados) {
    try {
     
      if (!id || isNaN(id)) {
        throw new Error('ID inválido');
      }
      
      
      const usuario = await this.usuarioDAO.buscarPorId(id);
      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }
      
     
      usuario.nome = dados.nome || usuario.nome;
      usuario.email = dados.email || usuario.email;
      usuario.telefone = dados.telefone || usuario.telefone;
      
      await this.usuarioDAO.atualizar(id, usuario);
      
      return { mensagem: 'Usuário atualizado com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }


  async deletar(id) {
    try {
      
      if (!id || isNaN(id)) {
        throw new Error('ID inválido');
      }
      
      
      const usuario = await this.usuarioDAO.buscarPorId(id);
      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }
      
      await this.usuarioDAO.deletar(id);
      
      return { mensagem: 'Usuário deletado com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  }
  async buscarPorNomeCompleto(nome) {
  try {
    if (!nome) {
      throw new Error("Nome é obrigatório para busca");
    }

    const usuarios = await this.usuarioDAO.buscarPorNomeCompleto(nome);

    if (!usuarios || usuarios.length === 0) {
      throw new Error("Usuário não encontrado");
    }

    return usuarios;

  } catch (error) {
    throw new Error(`Erro ao buscar usuário por nome: ${error.message}`);
  }
}

}
module.exports = UsuarioService;
