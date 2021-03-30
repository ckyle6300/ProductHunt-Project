'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCreator = sequelize.define('ProductCreator', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {});
  ProductCreator.associate = function (models) {
    ProductCreator.belongsTo(models.User, { foreignKey: 'userId' })
    ProductCreator.belongsTo(models.Product, { foreignKey: 'productId' })
  };
  return ProductCreator;
};