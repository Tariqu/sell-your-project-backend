const { DataTypes } = require('sequelize/types');
const sequelize = require('../../config/database');

const Category = sequelize.define(
  'Category',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    modelName: 'Category',
    freezeTableName: true,
  }
);

module.exports = Category;
