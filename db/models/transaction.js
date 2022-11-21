const { DataTypes } = require('sequelize/types');
const sequelize = require('../../config/database');

const Transaction = sequelize.define(
  'Transaction',
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.BIGINT,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    projectId: {
      type: DataTypes.BIGINT,
      references: {
        model: 'Project',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'failed', 'success'),
      defaultValue: 'pending',
    },
    transactionId: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: 'Transaction',
    freezeTableName: true,
  }
);

module.exports = Transaction;
