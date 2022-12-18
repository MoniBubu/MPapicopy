const { body } = require('express-validator');
const { default: axios } = require('axios');

const getAllProductsValidator = [];

const deleteProductValidator = [];

const createOrUpdateItemvalidator = [
    body('product')
        .isString()
        .withMessage('Product should be string')
        .not()
        .isEmpty()
        .withMessage('Product can not be empty'),
    body('product')
        .custom(value => {
            return axios.get('http://localhost:3001/products').then((products) => {
                for(const key of products.data) {
                    if(key.product === value) {
                        return Promise.reject('Product already exist')
                    }
                }
            });
        })
        .withMessage('Product already exist'),
    body('name')
        .isString()
        .withMessage('Name should be string')
        .isLength({min: 3, max: 50})
        .withMessage('Name should be between 5 and 50 characters'),
    body('price')
        .isFloat()
        .withMessage('Price should be number'),
    body('material')
        .isString()
        .withMessage('Material should be string'),
    body('inStock')
        .isIn([true, false])
        .withMessage('InStock can be only true or false')
];

module.exports = {
    getAllProductsValidator,
    deleteProductValidator,
    createOrUpdateItemvalidator
};