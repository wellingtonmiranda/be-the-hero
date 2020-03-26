const express = require('express');
const cors = require('cors');
const routes = require('./routes'); /*usa o ./ para dizer que ele é um arquivo e n um pacote como o express acima.*/

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes); /*Esse tem que ficar abaixo do express.json*/

app.listen(3333);