-- Criar o banco de dados
CREATE DATABASE db_clientes;

-- Criar a tabela para armazenar os clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    celular VARCHAR(11) NOT NULL
);