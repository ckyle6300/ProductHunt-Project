'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {});
  Comment.associate = function (models) {
    Comment.belongsTo(models.Product, { foreignKey: 'productId' })
    Comment.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Comment;
};