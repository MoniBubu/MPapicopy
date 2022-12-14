const express = require('express');
const { UserController } = require('./controllers/user.controller');
const { ProductController } = require('./controllers/item.controller')
const { basicAuthMiddleware } = require('./middlewares/basic-auth.middleware');
const { setHeadersMiddleware } = require('./middlewares/set-headers.middleware');
const { createOrUpdateUserValidators, getAllUsersValidators: getUsersValidators, updateUserValidators, deleteUserValidator } = require('./validators/user.valdiators');
const { getAllProductsValidator, createOrUpdateItemvalidator, deleteProductValidator } = require('./validators/product.validators')
const app = express();
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const cookieParser = require('cookie-parser');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(express.json());
app.use(setHeadersMiddleware);
app.use(cookieParser());

app.get('/', function(req, res) {
    res
        .cookie('PHPSESSID', '72wefjm546ee694c4d638d1c24f05a')
        .cookie('Job', 'AutomationTester')
        .send('Test request');
})

app.get('/users', ...getUsersValidators, UserController.getAllUsers);
app.get('/users/:id', getUsersValidators, UserController.getSpecificUser);
app.post('/users', ...createOrUpdateUserValidators, UserController.createUser);
app.put('/users/:id', ...createOrUpdateUserValidators, UserController.updateUser);
app.delete('/users/:id', ...deleteUserValidator, UserController.deleteUser);

app.use('/auth', basicAuthMiddleware);
app.get('/auth', (req, res) => res.send(204));

app.get('/products', ...getAllProductsValidator, ProductController.getAllProducts);
app.get('/products/:id', ...getAllProductsValidator, ProductController.getSpecificProduct);
app.post('/products', ...createOrUpdateItemvalidator, ProductController.createProduct);
app.put('/products/:id', ...createOrUpdateItemvalidator, ProductController.updateProduct);
app.delete('/products/:id', ...deleteProductValidator, ProductController.deleteProduct);

app.listen(3001, () => console.log('App running on port 3001'));