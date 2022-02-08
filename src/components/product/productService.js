'use script';

const model = require('@models/index');
const { Op, literal } = require('sequelize');
const { parseStringifyData, getDataPagination } = require('@helpers/dataHelper');
const logger = require('@logger');

module.exports = {
    create: async(req, cb) => {
        try {
            let body = req.body;

            result = parseStringifyData(await model.products.create(body, { logging: false }))

            cb(null, result)
        } catch (err) {
            logger.log({
                level: "error",
                message: "CREATE PRODUCTS ERROR ==> ".concat(err.message)
            })
            cb(err)
        }
    },

    lists: async(req, cb) => {
        try {
            const query = req.query
            let result, search, include, condition

            search = query.search ? query.search : '';
            search = {
                [Op.or]: [{
                    name: {
                        [Op.substring]: search
                    }
                }, ],
            }

            condition = {
                ...search
            }

            query.attributes = { exclude: ['createdAt', 'updatedAt'] }
            result = await getDataPagination(model.products, condition, query, include, (err, res) => {
                if (err) throw err;

                return res;
            });

            cb(null, result)
        } catch (err) {
            logger.log({
                level: "error",
                message: "GET LISTS OF PRODUCTS ERROR ==> ".concat(err.message)
            })
            cb(err)
        }
    },

    detail: async(req, cb) => {
        try {
            const {
                key = {
                    [Op.not]: null
                }
            } = req.params

            let result = parseStringifyData(await model.products.findOne({
                attributes: { exclude: ['updatedAt'] },
                where: { id: key },
                logging: false
            }))

            cb(null, result)
        } catch (err) {
            logger.log({
                level: "error",
                message: "GET PRODUCTS DETAIL ERROR ==> ".concat(err.message)
            })
            cb(err)
        }
    },

    update: async(req, cb) => {
        try {
            let { key = null } = req.params;
            let body = req.body;
            let brandData, result

            brandData = await model.products.findByPk(key, { logging: false })
            if (brandData === null) throw { name: "Bad Request", message: "Invalid Brand!" }

            if (key === null) throw { name: "Bad Request", message: "Key is required!" };

            result = await brandData.update(body, { logging: false })

            if (result) {
                cb(null, parseStringifyData(result))
            }
        } catch (err) {
            logger.log({
                level: "error",
                message: "UPDATE PRODUCTS ERROR ==> ".concat(err.message)
            })
            cb(err)
        }
    },

    delete: async(req, cb) => {
        try {
            let { key = null } = req.params;
            let brandData, result

            if (key === null) throw { name: "Bad Request", message: "Key is required!" };

            brandData = await model.products.findByPk(key, { logging: false })
            if (brandData === null) throw { name: "Bad Request", message: "Invalid Brand!" }

            result = await brandData.destroy({ where: { id: key }, logging: false })
            if (result) {
                cb(null, parseStringifyData(brandData))
            }
        } catch (err) {
            logger.log({
                level: "error",
                message: "DELETE PRODUCTS ERROR ==> ".concat(err.message)
            })
            cb(err)
        }
    },
}