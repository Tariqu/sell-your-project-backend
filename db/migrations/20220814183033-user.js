const sequelize = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.BIGINT,
      },
      userType: {
        // 0: admin, 1: seller, 2: buyer
        type: sequelize.ENUM('0', '1', '2'),
      },
      firstName: {
        type: sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: sequelize.STRING,
        allowNull: false,
      },
      profilePic: {
        type: sequelize.STRING,
      },
      address: {
        type: sequelize.JSONB,
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
    await queryInterface.dropTable('User');
  },
};
