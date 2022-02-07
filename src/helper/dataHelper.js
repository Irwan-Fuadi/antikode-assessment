'use strict';

const generatorUtils = require('@utils/generator');
const Helper = require('@helpers/pagination')
const { Op } = require('sequelize');

async function getCodeExist(prefix, modelx, field) {
    let code = prefix + generatorUtils.getRandom(5).toUpperCase();
    let is_existing = await module.exports.checkDataIsExist(modelx, code, field);

    if (!is_existing) {
        return code;
    } else {
        getCodeExist();
    }
}

module.exports = {
    getCodeExist,

    getValueLike: async function(models, value, source, target) {
        var condition = {};

        condition[source] = {
            [Op.like]: value
        };

        const getData = await models.findOne({
            where: condition,
            attributes: [target]
        });

        let result;
        result = getData !== null ? getData.getDataValue(target) : null;

        return result;
    },

    checkDataIsExist: async function(models, value, source) {
        const condition = {};

        condition[source] = {
            [Op.like]: value
        };

        const getData = await models.findAll({
            where: condition
        });

        let result;
        result = getData.length > 0 ? true : false;

        return result;
    },

    getValueEqual: async function(models, value, source, include) {
        const condition = {};

        condition[source] = value;
        let option = {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: condition
        }
        if (include)
            option.include = include;

        let result = await models.findOne(option)
        return result;
    },

    getDataPagination: async(model, condition, query, include, cb) => {
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 10;
        let order = query.order
        let option = {
            where: condition,
            offset: Helper.pagyOffset(limit, page),
            limit: limit,
            order: order,
            logging: false
        }
        let optionCount = {
            where: condition,
            logging: false
        }

        if (query.attributes) {
            option.attributes = query.attributes;
        }

        if (query.subQuery !== undefined) {
            option.subQuery = query.subQuery;
        }

        if (query.raw !== undefined) {
            option.raw = query.raw;
        }

        if (include) {
            option.include = include;
            optionCount.include = include;
        }

        try {
            const datas = await model.findAll(option)
            let datax = await model.findAll(optionCount)
            datax = datax.length

            const result = {
                pagination: Helper.pagination(datax, limit, page),
                data: datas
            }
            return cb(null, result)
        } catch (e) {
            return cb(e)
        }
    },

    isJson: (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },

    isEmptyObj: (obj) => {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }

        return JSON.stringify(obj) === JSON.stringify({});
    },

    extractString: (str, param) => {
        return str.length > 0 ? str.substr(0, str.indexOf(param)) : null;
    },

    cleanArrayObject: (obj) => {
        const newObj = Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : (a[k] = v, a)), {});
        return newObj;
    },

    parseStringifyData: (data) => {
        return JSON.parse(JSON.stringify(data))
    },

    toTimestamp: (strDate) => {
        var datum = Date.parse(strDate);
        return datum / 1000;
    }
}