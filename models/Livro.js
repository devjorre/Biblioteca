class Livro {
  constructor(id_livro, titulo, autor, ano_publicacao, categoria, isbn, disponivel) {
    this.id_livro = id_livro;
    this.titulo = titulo;
    this.autor = autor;
    this.ano_publicacao = ano_publicacao;
    this.categoria = categoria;
    this.isbn = isbn;
    this.disponivel = disponivel !== undefined ? disponivel : true;
  }

 
  static validar(titulo, autor) {
    if (!titulo || !autor) {
      throw new Error('Título e autor são obrigatórios');
    }
    return true;
  }

estaDisponivel() {
    return this.disponivel === 1 || this.disponivel === true;
  }

  
  marcarIndisponivel() {
    this.disponivel = false;
  }


  marcarDisponivel() {
    this.disponivel = true;
  }


  toJSON() {
    return {
      id_livro: this.id_livro,
      titulo: this.titulo,
      autor: this.autor,
      ano_publicacao: this.ano_publicacao,
      categoria: this.categoria,
      isbn: this.isbn,
      disponivel: this.disponivel
    };
  }
}
module.exports = Livro;