const { default: axios } = require('axios');
const { body } = require('express-validator');
const { UserController } = require('../controllers/user.controller');
 
const getAllUsersValidators = [];

const deleteUserValidator = [];
 
const createOrUpdateUserValidators = [
    body('firstname')
        .isString()
        .withMessage('Firstname should be string'),
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
    body('email')
        .custom(value => {
            return axios.get('http://localhost:3001/users').then((users) => {
                for(const key of users.data) {
                    console.log(value)
                    if(key.email === value) {
                        return Promise.reject('E-mail already exist')
                    }
                }
            });
        })
        .withMessage('Email already exist'),
    body('newsletter')
        .optional()
        .isBoolean()
        .withMessage('Newsletter should be true or false'),
    body('job')
        .isIn(["manual", "automation"])
        .withMessage('Job can be only manual or automation')
];

module.exports = {
    createOrUpdateUserValidators,
    getAllUsersValidators,
    deleteUserValidator
};