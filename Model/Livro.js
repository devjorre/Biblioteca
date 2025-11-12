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

  // Validar dados do livro
  static validar(titulo, autor) {
    if (!titulo || !autor) {
      throw new Error('Título e autor são obrigatórios');
    }
    return true;
  }

  // Verificar se livro está disponível
  estaDisponivel() {
    return this.disponivel === true;
  }

  // Marcar como indisponível
  marcarIndisponivel() {
    this.disponivel = false;
  }

  // Marcar como disponível
  marcarDisponivel() {
    this.disponivel = true;
  }

  // Converter para JSON
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