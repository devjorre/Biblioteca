class Multa {
  constructor(id, idEmprestimo, valor, tipoPagamento, pago) {
    this.id = id;
    this.idEmprestimo = idEmprestimo;
    this.valor = valor;
    this.tipoPagamento = tipoPagamento;
    this.pago = pago;
  }
}

module.exports = Multa;
