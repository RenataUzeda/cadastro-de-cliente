require('dotenv').config();
const knex = require('../database/dbConnection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
  try {
    const {nome, email, celular, senha } = req.body;

    // Validação básica
    if (!nome || !email || !celular || !senha) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Verificar se o email já está registrado
    const existingUser = await knex('clientes').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ message: 'Email já está em uso.' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criação do registro no banco de dados
    const [newUser] = await knex('clientes').insert(
      {
        nome,
        email,
        celular,
        senha: hashedPassword,
      },
      ['id', 'nome', 'email', 'celular', 'senha']
    );

    const { senha:_, ...user } = newUser;

    // Gerar token JWT
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso!',
      usuario: user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar o usuário.' });
  }
};

module.exports = registerController;