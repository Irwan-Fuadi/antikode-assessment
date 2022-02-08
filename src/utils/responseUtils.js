'use strict';

let resFormat;

module.exports = {
    /**
     * Success result with count and data attribute
     *
     * @param message
     * @param data
     * @return {{data: *, count: number, message: *, status: boolean}}
     */
    success: function(message, data, code, metta) {
        const count = data != null ? data.length : 0;
        resFormat = {
            message: message,
            data: data,
            code: code,
            metta: metta,
            success: true
        }

        return resFormat;
    },

    /**
     * Updated result with message and status
     *
     * @param message
     * @param data
     * @return {{message: *, status: boolean}}
     */
    updated: function(message, data) {
        resFormat = {
            status: true,
            message: message
        }

        return resFormat;
    },

    /**
     * Wrap function result with count and data attribute eventhough it's a null
     *
     * @param message
     * @param data
     * @return {{data: *, count: number, message: *, status: boolean}}
     */
    successCompleteForm: function(message, data) {
        const count = data != null ? data.length : 0;
        resFormat = {
            status: true,
            message: message,
            count: count,
            data: data
        }

        return resFormat;
    },

    /**
     * OK result with count and data attribute
     *
     * @param message
     * @param data
     * @return {{message: *, status: boolean, count: number, data: *}}
     */
    OK: function(message, data) {
        const count = data != null ? data.length : 0;

        resFormat = {
            status: true,
            message: message,
            count: count,
            data: data
        }

        if (data === null || count === 0) {
            delete resFormat.data;
            delete resFormat.count;
        }

        return resFormat;
    },

    /**
     * Failed result with message, status and error
     *
     * @param message
     * @param data
     * @return {{message: *, status: boolean, error: *}}
     */
    failed: function(message, error) {
        return resFormat = {
            status: false,
            message: message,
            error: error
        }
    },

    /**
     * Wrap function result message and data before callback to routing layer
     *
     * @param message
     * @param data
     * @return {{message: *, status: boolean, data: *}}
     */
    wrapResult: function(message, data, success = true) {
        let resFormat = {
            message: message,
            data: data,
            success: success
        }

        return resFormat;
    },

    /**
     * Wrap function result lists message and data before callback to routing layer
     *
     * @param message
     * @param data
     * @return {{message: *, status: boolean, data: *}}
     */
    wrapResultLists: function(message, data, success = true) {
        let resFormat = {
            message: message,
            success: success,
            data: []
        }

        if (data !== null || data.length > 0) {
            resFormat.data = data
        }

        return resFormat;
    }


}