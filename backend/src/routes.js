const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
     [Segments.BODY]: Joi.object().keys({
          name: Joi.string().required(),
          email: Joi.string().required().email(),
          whatsapp: Joi.string().required().min(10).max(11),
          city: Joi.string().required(),
          uf: Joi.string().required().length(2),
     })
}), OngController.create);

routes.get('/profile', celebrate({
     [Segments.HEADERS]: Joi.object({
         authorization: Joi.string().required(), 
     }).unknown()
}), ProfileController.index);

routes.get('/incidents', celebrate({
[Segments.QUERY]: Joi.object().keys({
     page: Joi.number(),
})
}), IncidentController.index);


routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id', celebrate({
     [Segments.PARAMS]: Joi.object().keys({
          id: Joi.number().required(),
     })
}), IncidentController.delete);

module.exports = routes;

/*para acessar a rota raiz, usa a "/" e para acessar os recursos: 
     Ex: /contato, /biografia etc*/

/* Metodos HTTP:
GET: Buscar/listar uma informação no back-end (sempre qdo tiver algum tipo de retorno)
POST: Criar uma informação no back-end (Criar um usuário por exemplo)
PUT: Alterar informação no back-end
DELETE: Deletar uma informação no back-end
*/

/* Tipos de parâmetros:
* Query Params: Parâmetros nomeados enviados na rota após o simbolo de "?" (Filtros, paginação) ex: localhost:3333/users?name=Diego
* Route Params: Parâmetros utilizados para identificar recursos. (buscar dados de um unico recurso) ex: users/1 (o 1 é o id  do usuário por exemplo)
* Request Body: Corpo da requisição, utilizado para criar ou alterar recursos.
*/

/* Rota é o localhost:3333 / Recurso é o que vem depois da "/". ex: /users */

/* Formas de localizar itens no Banco de dados:
* Driver: SELECT * FROM users - Jeito convencional da linguagem SQL
* Query Builder: table('users').select('*').where() - Formato JS
*/