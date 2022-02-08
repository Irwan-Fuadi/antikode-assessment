'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class outlets extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    outlets.init({
        brand_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        picture: DataTypes.TEXT,
        address: DataTypes.TEXT,
        longitude: DataTypes.STRING,
        latitude: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'outlets',
    });
    return outlets;
};