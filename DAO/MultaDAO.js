// DAO/MultaDAO.js
class MultaDAO {
  constructor(pool) {
    this.pool = pool;
  }

  async listarTodas() {
    const sql = `
      SELECT 
        m.id,
        m.id_emprestimo,
        m.valor,
        m.forma_pagamento,
        m.pago,
        u.nome as usuario
      FROM multas m
      INNER JOIN emprestimo e ON m.id_emprestimo = e.id_emprestimo
      INNER JOIN usuario u ON e.id_usuario = u.id_usuario
      ORDER BY m.id DESC
    `;
    const conn = await this.pool.getConnection();
    try {
      const [rows] = await conn.query(sql);
      return rows;
    } finally {
      conn.release();
    }
  }

  async buscarPorId(id) {
    const conn = await this.pool.getConnection();
    try {
      const [rows] = await conn.query(
        `SELECT m.*, e.id_usuario, e.id_livro FROM multas m
         LEFT JOIN emprestimo e ON m.id_emprestimo = e.id_emprestimo
         WHERE m.id = ?`,
        [id]
      );
      return rows; // caller decides (rows[0] vs rows)
    } finally {
      conn.release();
    }
  }

  async criar(multa) {
    const conn = await this.pool.getConnection();
    try {
      const [result] = await conn.query(
        `INSERT INTO multas (id_emprestimo, valor, forma_pagamento, pago) VALUES (?, ?, ?, ?)`,
        [multa.id_emprestimo, multa.valor, multa.forma_pagamento || null, multa.pago ? 1 : 0]
      );
      return { insertId: result.insertId, affectedRows: result.affectedRows };
    } finally {
      conn.release();
    }
  }

  async atualizar(id, multa) {
    const conn = await this.pool.getConnection();
    try {
      const [result] = await conn.query(
        `UPDATE multas SET id_emprestimo=?, valor=?, forma_pagamento=?, pago=? WHERE id=?`,
        [multa.id_emprestimo, multa.valor, multa.forma_pagamento || null, multa.pago ? 1 : 0, id]
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async pagar(id) {
    const conn = await this.pool.getConnection();
    try {
      const [result] = await conn.query(
        `UPDATE multas SET pago = TRUE WHERE id = ?`,
        [id]
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async deletar(id) {
    const conn = await this.pool.getConnection();
    try {
      const [result] = await conn.query(`DELETE FROM multas WHERE id = ?`, [id]);
      return result;
    } finally {
      conn.release();
    }
  }
}

module.exports = MultaDAO;
