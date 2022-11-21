const sequelize = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transaction', {
      id: {
        type: sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      UserId: {
        type: sequelize.BIGINT,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      projectId: {
        type: sequelize.BIGINT,
        references: {
          model: 'Project',
          key: 'id',
        },
      },
      status: {
        type: sequelize.ENUM('pending', 'failed', 'success'),
        defaultValue: 'pending',
      },
      transactionId: {
        type: sequelize.STRING,
      },
      createdAt: {
        type: sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transaction');
  },
};
