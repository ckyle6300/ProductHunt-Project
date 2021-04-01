'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    productName: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.TEXT
  }, {});
  Product.associate = function (models) {
    const columnMapping = {
      through: 'ProductCreators',
      other: 'userId',
      foreignKey: 'productId'
    }
    Product.belongsToMany(models.User, columnMapping)

    Product.hasMany(models.Comment, { foreignKey: 'productId' })

  };
  return Product;
};