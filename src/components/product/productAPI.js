const route = require('express').Router();
const services = require('./productService');
const responseUtils = require('@utils/responseUtils');
const { decoderHS256 } = require('../../middlewares/jwtDecoder');

route.post('/', /*decoderHS256,*/ async(req, res, next) => {
    await services.create(req, (error, result) => {
        if (error) {
            next(error)
        } else {
            res
                .status(201)
                .send(responseUtils.wrapResult("Product success created!", result))
        }
    })
});

route.get('/', /*decoderHS256,*/ async(req, res, next) => {
    await services.lists(req, (error, result) => {
        if (error) {
            next(error)
        } else {
            res
                .status(200)
                .send(responseUtils.wrapResultLists("Success Get Product lists!", result))
        }
    })
});

route.get('/:key', /*decoderHS256,*/ async(req, res, next) => {
    await services.detail(req, (error, result) => {
        if (error) {
            next(error)
        } else {
            res
                .status(200)
                .send(responseUtils.wrapResult("Success Get Product Details!", result))
        }
    })
});

route.put('/:key', /*decoderHS256,*/ async(req, res, next) => {
    await services.update(req, (error, result) => {
        if (error) {
            next(error)
        } else {
            res
                .status(200)
                .send(responseUtils.wrapResult("Success Update Product!", result))
        }
    })
});

route.delete('/:key', /*decoderHS256,*/ async(req, res, next) => {
    await services.delete(req, (error, result) => {
        if (error) {
            next(error)
        } else {
            res
                .status(200)
                .send(responseUtils.updated("Success Delete Product!"))
        }
    })
});

module.exports = route;