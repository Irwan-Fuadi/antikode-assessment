'use script';

const model = require('@models/index');
const { literal } = require('sequelize');
const { parseStringifyData } = require('@helpers/dataHelper');
const logger = require('@logger');

module.exports = {
    get: async(req, cb) => {
        try {
            let result = await lastupdatedCache()

            if (!result) {
                result = await getLatestUpdated()
                result = result ? result : toTimestamp(new Date())
                return cb(null, result)
            }

            cb(null, result)
        } catch (error) {
            logger.log({
                level: "error",
                message: "GET LASTUPDATED ERROR ==> ".concat(error.message)
            })
            cb(error)
        }
    }
}