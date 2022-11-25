const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Project = sequelize.define(
  'Project',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    title: {
      // 0: admin, 1: seller, 2: buyer
      type: DataTypes.STRING,
    },
    thumbnail: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    productImage: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    price: {
      type: DataTypes.DECIMAL,
    },
    shortDescription: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    productUrl: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  },
  {
    paranoid: true,
    modelName: 'Project',
    freezeTableName: true,
  }
);

module.exports = Project;
