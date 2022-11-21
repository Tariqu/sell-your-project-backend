const sequelize = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Category', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.BIGINT,
      },
      name: {
        type: sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Category');
  },
};
