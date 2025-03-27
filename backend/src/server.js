require('dotenv').config();
const express = require('express');
const cors = require('cors');
const knex = require('../database/dbConnection');
const registerController = require('../controllers/register');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/cadastro', registerController);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
