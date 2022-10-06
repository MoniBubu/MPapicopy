const { default: axios } = require('axios');
const { validationResult, param } = require('express-validator');
const { createBadRequestResponse } = require('../helpers/bad-request.helper');
let moment = require('moment');
const date = moment(Date.now()).format('YYYY-MM-DD HH:mm');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


class UserController {

    static async getAllUsers(req, res) {
        const response = await axios.get('http://localhost:27002/users', { params: req.query});
        res.status(200).json(response.data)
    }

    static async getSpecificUser(req, res) {
        try {
            const response = await axios.get(`http://localhost:27002/users/${req.params.id}`)
            res.status(200).json(response.data)   
        } catch(err) {
            res.status(400).json({
              message: err.message
            })
          }
    }

    static async createUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return createBadRequestResponse(res, errors);
        }
    
        try {
          const { firstname, lastname, age,  email, newsletter } = req.body;
          const response = await axios.post('http://localhost:27002/users', { firstname, lastname, age, email, newsletter, created: date });
          
          res.status(201).json({
            message: 'New user created successfully',
            user: await response.data,
          });
          
        } catch(err) {
          res.status(400).json({
            message: err.message
          })
        }
    }

    static async updateUser(req,res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return createBadRequestResponse(res,errors);
        }

        try {

            const { name, email } = req.body;
            const response = await axios.put(`http://localhost:27002/users/${req.params.id}`, { name, email, updated: date });
            
            res.status(200).json({
                message: 'Update user  successfully',
                user: await response.data,
                created: moment(Date.now()).format('YYYY-MM-DD HH:mm')
            });

        } catch (err) {     
            res.status(404).json({
                message: 'User not found'
            })
        }
    }

    static async deleteUser(req,res) {
        try {
            await axios.delete(`http://localhost:27002/users/${req.params.id}`);
            res.status(200).json(true)
        } catch(err) {
            res.status(404).json({
                message: 'User not found'
            })
        }
    }
}

module.exports = { UserController };
