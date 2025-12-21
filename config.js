

module.exports = {

  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'biblioteca',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  },


  server: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development'
  },


  emprestimo: {
    diasPadrao: parseInt(process.env.DIAS_EMPRESTIMO) || 7,
    multaPorDia: parseFloat(process.env.MULTA_POR_DIA) || 1.00
  }
};
