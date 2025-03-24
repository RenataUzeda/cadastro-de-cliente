const bcrypt = require('bcryptjs');
const knex = require('../../database/dbConnection');
const { gerarToken } = require('../config/jwt');

async function cadastrarCliente(req, res) {
    try {
        const { nome, email, celular, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios!' });
        }

        const clienteExistente = await knex('clientes').where({ email }).first();
        if (clienteExistente) {
            return res.status(400).json({ erro: 'E-mail já cadastrado!' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const [id] = await knex('clientes').insert({
            nome,
            email,
            celular,
            senha: senhaCriptografada
        }).returning('id');

        const token = gerarToken({ id, email });

        return res.status(201).json({ mensagem: 'Cadastro realizado com sucesso!', token });
    } catch (erro) {
        console.log(erro.message);
        
        return res.status(500).json({ erro: 'Erro no servidor.' });
    }
}

module.exports = { cadastrarCliente };
