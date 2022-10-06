const { body, param } = require('express-validator');
 
const getAllUsersValidators = [];

const deleteUserValidator = [];
 
const createUserValidators = [
    body('firstname')
        .isString()
        .withMessage('Firstname should be string')
        .isLength({ min: 3, max: 20 })
        .withMessage('Firstname should be between 5 and 55 characters'),
    body('lastname')
        .isString()
        .withMessage('Lastname should be string')
        .isLength({min: 3, max: 50})
        .withMessage('Lastname should be between 5 and 50 characters'),
    body('age')
        .isInt()
        .withMessage('Age should be number'),
    body('email')
        .isEmail()
        .isLength({max: 50})
        .withMessage('Not an e-mail.'),
    body('newsletter')
        .optional()
        .isBoolean()
        .withMessage('Newsletter should be true or false')
];

const updateUserValidators = [
    body('email')
        .optional()
        .isEmail()
        .isLength({max: 50})
        .withMessage('Not an e-mail.'),
    body('newsletter')
        .optional()
        .isBoolean()
        .withMessage('Newsletter should be true or false')
];

module.exports = {
    createUserValidators,
    getAllUsersValidators,
    updateUserValidators,
    deleteUserValidator
};