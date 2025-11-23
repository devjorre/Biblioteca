DROP DATABASE IF EXISTS biblioteca;
CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    matricula VARCHAR(9) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(100) NOT NULL,
    tipo ENUM('CLIENTE', 'FUNCIONARIO') NOT NULL DEFAULT 'CLIENTE'
);

CREATE TABLE livro (
    id_livro INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    ano_publicacao VARCHAR(4) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    isbn VARCHAR(50),
    disponivel BOOLEAN DEFAULT TRUE
);

CREATE TABLE emprestimo (
    id_emprestimo INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_livro INT NOT NULL,
    data_retirada DATE NOT NULL,
    data_prevista_devolucao DATE NOT NULL,
    data_devolucao DATE,
    id_multa INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_livro) REFERENCES livro(id_livro)
);

CREATE TABLE multas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_emprestimo INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    forma_pagamento VARCHAR(50) NULL,
    pago BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_emprestimo) REFERENCES emprestimo(id_emprestimo)
);

INSERT INTO usuario (nome, matricula, email, telefone, tipo) VALUES
('João Silva', '2024001', 'joao@email.com', '11999999999', 'CLIENTE'),
('Maria Santos', '2024002', 'maria@email.com', '11988888888', 'CLIENTE'),
('Pedro Oliveira', '2024003', 'pedro@email.com', '11977777777', 'CLIENTE'),
('Ana Costa', '2024004', 'ana@email.com', '11966666666', 'FUNCIONARIO');

INSERT INTO livro (titulo, autor, ano_publicacao, categoria, isbn, disponivel) VALUES
('O Senhor dos Anéis: A Sociedade do Anel', 'J. R. R. Tolkien', '1954', 'Fantasia', '9780547928210', 1),
('1984', 'George Orwell', '1949', 'Ficção Distópica', '9780451524935', 1),
('Dom Casmurro', 'Machado de Assis', '1899', 'Romance', '9788520922308', 1),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', '1943', 'Infantil', '9788578881950', 1),
('Clean Code', 'Robert C. Martin', '2008', 'Tecnologia', '9780132350884', 1),
('Harry Potter e a Pedra Filosofal', 'J. K. Rowling', '1997', 'Fantasia', '9788532530790', 1),
('A Arte da Guerra', 'Sun Tzu', '0500', 'Estratégia', '9788537813805', 1),
('O Hobbit', 'J. R. R. Tolkien', '1937', 'Fantasia', '9780345339683', 1),
('Orgulho e Preconceito', 'Jane Austen', '1813', 'Romance', '9780141439518', 1);

INSERT INTO emprestimo (id_usuario, id_livro, data_retirada, data_prevista_devolucao, data_devolucao, id_multa) VALUES
(1, 1, '2025-11-01', '2025-11-15', '2025-11-20', NULL),
(2, 2, '2025-10-20', '2025-11-03', '2025-11-10', NULL),
(3, 3, '2025-11-10', '2025-11-24', NULL, NULL);

INSERT INTO multas (id_emprestimo, valor, forma_pagamento, pago) VALUES
(1, 10.00, 'DINHEIRO', FALSE),
(2, 25.75, 'CARTAO', TRUE),
(3, 5.00, 'PIX', FALSE);

UPDATE emprestimo SET id_multa = 1 WHERE id_emprestimo = 1;
UPDATE emprestimo SET id_multa = 2 WHERE id_emprestimo = 2;
UPDATE emprestimo SET id_multa = 3 WHERE id_emprestimo = 3;

SELECT * FROM usuario;
SELECT * FROM livro;
SELECT * FROM emprestimo;
SELECT * FROM multas;
