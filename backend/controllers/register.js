require('dotenv').config();
const knex = require('../database/dbConnection');
const bcrypt = require('bcryptjs');
const gerarToken = require('../src/config/jwt');

const registerController = async (req, res) => {
  try {
    const {nome, email, celular, senha } = req.body;

    if (!nome || !email || !celular || !senha) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const existingUser = await knex('clientes').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ message: 'Email já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

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

    const token = gerarToken({ id: user.id });

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