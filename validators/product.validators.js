const { body } = require('express-validator');

const getAllProductsValidator = [];

const deleteProductValidator = [];

const createOrUpdateItemvalidator = [
    body('product')
        .isString()
        .withMessage('Product should be string')
        .not()
        .isEmpty()
        .withMessage('Product can not be empty'),
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