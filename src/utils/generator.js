const moment = require('moment');
const crypto = require('crypto');
const dataHelper = require('@helpers/dataHelper');

module.exports = {
    getLocalTime: () => {
        return moment()
            .tz("Asia/Jakarta")
            .format();
    },

    getRandom: (size) => {
        return crypto.randomBytes(size).toString('hex');
    },

    randomStr: (length) => {
        let s = '';
        while (s.length < length) s += Math.random().toString(36).substr(2, length - s.length);
        return s;
    },

    getCodeExist: async(prefix, modelx, field) => {
        let code = prefix + getRandom(5).toUpperCase();
        let is_existing = await dataHelper.checkDataIsExist(modelx, code, field);

        if (!is_existing) {
            return code;
        } else {
            getCodeExist();
        }
    }
}