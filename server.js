const express = require('express');
const { UserController } = require('./controllers/user.controller');
const { basicAuthMiddleware } = require('./middlewares/basic-auth.middleware');
const { setHeadersMiddleware } = require('./middlewares/set-headers.middleware');
const { createUserValidators, getAllUsersValidators: getUsersValidators, updateUserValidators, deleteUserValidator } = require('./validators/user.valdiators');
const app = express();
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const cookieSession = require('cookie-session');
const swaggerDocument = YAML.load('./swagger.yaml');
const cookieParser = require('cookie-parser');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(express.json());
app.use(setHeadersMiddleware);
app.use(cookieParser());

app.get('/', function(req, res) {
    res.cookie('PHPSESSID', '72wefjm546ee694c4d638d1c24f05a').send('Test request')
})

app.get('/users', ...getUsersValidators, UserController.getAllUsers);

app.get('/users/:id', getUsersValidators, UserController.getSpecificUser);

app.post('/users', ...createUserValidators, UserController.createUser);

app.put('/users/:id', ...updateUserValidators, UserController.updateUser);

app.delete('/users/:id', ...deleteUserValidator, UserController.deleteUser)


app.use('/me', basicAuthMiddleware);
app.get('/me', (req, res) => res.send(204));

app.listen(3001, () => console.log('App running on port 3001'));