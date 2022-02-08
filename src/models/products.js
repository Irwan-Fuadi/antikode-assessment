'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    products.init({
        brand_id: DataTypes.INTEGER,
        outlet_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        picture: DataTypes.TEXT,
        price: DataTypes.DECIMAL
    }, {
        sequelize,
        modelName: 'products',
    });
    return products;
};