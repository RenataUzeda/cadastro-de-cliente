require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const registerController = require('../controllers/register');
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../../frontend/src')));

app.post('/cadastro', registerController);


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
