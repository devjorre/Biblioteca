class Usuario {
  constructor(id_usuario, nome, matricula, email, telefone) {
    this.id_usuario = id_usuario;
    this.nome = nome;
    this.matricula = matricula;
    this.email = email;
    this.telefone = telefone;
  }

  // Validar dados do usuário
  static validar(nome, matricula, email) {
    if (!nome || !matricula || !email) {
      throw new Error('Nome, matrícula e email são obrigatórios');
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido');
    }
    
    return true;
  }

  // Converter para JSON
  toJSON() {
    return {
      id_usuario: this.id_usuario,
      nome: this.nome,
      matricula: this.matricula,
      email: this.email,
      telefone: this.telefone
    };
  }
}