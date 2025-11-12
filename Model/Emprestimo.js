
class Emprestimo {
  constructor(id_emprestimo, id_usuario, id_livro, data_retirada, data_prevista_devolucao, data_devolucao, multa) {
    this.id_emprestimo = id_emprestimo;
    this.id_usuario = id_usuario;
    this.id_livro = id_livro;
    this.data_retirada = data_retirada;
    this.data_prevista_devolucao = data_prevista_devolucao;
    this.data_devolucao = data_devolucao;
    this.multa = multa || 0;
  }

  
  static validar(id_usuario, id_livro) {
    if (!id_usuario || !id_livro) {
      throw new Error('ID do usuário e do livro são obrigatórios');
    }
    return true;
  }


  estaAtivo() {
    return this.data_devolucao === null || this.data_devolucao === undefined;
  }


  calcularMulta(dataDevolucao, dataPrevista, valorPorDia = 1.0) {
    if (new Date(dataDevolucao) > new Date(dataPrevista)) {
      const diasAtraso = Math.floor(
        (new Date(dataDevolucao) - new Date(dataPrevista)) / (1000 * 60 * 60 * 24)
      );
      this.multa = diasAtraso * valorPorDia;
      return this.multa;
    }
    this.multa = 0;
    return 0;
  }


  registrarDevolucao(dataDevolucao, multa) {
    this.data_devolucao = dataDevolucao;
    this.multa = multa;
  }


  toJSON() {
    return {
      id_emprestimo: this.id_emprestimo,
      id_usuario: this.id_usuario,
      id_livro: this.id_livro,
      data_retirada: this.data_retirada,
      data_prevista_devolucao: this.data_prevista_devolucao,
      data_devolucao: this.data_devolucao,
      multa: this.multa
    };
  }
}