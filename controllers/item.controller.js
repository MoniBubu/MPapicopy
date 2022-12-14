const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const { createBadRequestResponse } = require('../helpers/bad-request.helper');
let moment = require('moment');
const date = moment(Date.now()).format('YYYY-MM-DD HH:mm');

class ProductController {

    static async getAllProducts(req, res) {
        const response = await axios.get('http://localhost:27002/products', { params: req.query });
        res.status(200).json(response.data)
    }

    static async getSpecificProduct(req, res) {
        try {
            const response = await axios.get(`http://localhost:27002/products/${req.params.id}`)
            res.status(200).json(response.data)   
        } catch(err) {
            res.status(400).json({
              message: err.message
            })
          }
    }

    static async createProduct(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return createBadRequestResponse(res, errors);
        }
    
        try {
          const { product, name, price, material, inStock } = req.body;
          const response = await axios.post('http://localhost:27002/products', { product, name, price, material, inStock, updated: date });
          
          res.status(201).json({
            message: 'New product created successfully',
            user: await response.data,
          });
          
        } catch(err) {
          res.status(400).json({
            message: err.message
          })
        }
    }

    static async updateProduct(req,res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return createBadRequestResponse(res,errors);
        }

        try {

            const { product, name, price, material, inStock } = req.body;
            const response = await axios.put(`http://localhost:27002/products/${req.params.id}`, { product, name, price, material, inStock, updated: date });
            
            res.status(200).json({
                message: 'Update product successfully',
                user: await response.data,
                created: moment(Date.now()).format('YYYY-MM-DD HH:mm')
            });

        } catch (err) {     
            res.status(404).json({
                message: 'Product not found'
            })
        }
    }

    static async deleteProduct(req,res) {
        try {
            await axios.delete(`http://localhost:27002/products/${req.params.id}`);
            res.status(200).json(true)
        } catch(err) {
            res.status(404).json({
                message: 'Product not found'
            })
        }
    }
}

module.exports = { ProductController };
