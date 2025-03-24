require('dotenv').config();
const express = require('express');
const cors = require('cors');
const knex = require('../database/dbConnection');
const { cadastrarCliente } = require('../../backend/src/controllers/authControllers');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/cadastro', cadastrarCliente);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
