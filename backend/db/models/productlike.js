'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductLike = sequelize.define('ProductLike', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {});
  ProductLike.associate = function(models) {
    // associations can be defined here
  };
  return ProductLike;
};