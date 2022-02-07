'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Lastupdated extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Lastupdated.init({
        last_udpated: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Lastupdateds',
    });
    return Lastupdated;
};