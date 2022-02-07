const route = require('express').Router();
const services = require('./brandService');
const responseUtils = require('@utils/responseUtils');
const { decoderHS256 } = require('../../middlewares/jwtDecoder');

route.get('/', async(req, res, next) => {
    await services.get(req, (error, result) => {
        if (error) {
            next(error)
        } else {
            res
                .status(200)
                .send(result)
        }
    })
});

module.exports = route;