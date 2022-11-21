const sequelize = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Project', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.BIGINT,
      },
      title: {
        // 0: admin, 1: seller, 2: buyer
        type: sequelize.ENUM('0', '1', '2'),
      },
      thumbnail: {
        type: sequelize.STRING,
      },
      isFeatured: {
        type: sequelize.BOOLEAN,
        defaultValue: false,
      },
      productImage: {
        type: sequelize.ARRAY(sequelize.STRING),
      },
      price: {
        type: sequelize.DECIMAL,
      },
      shortDescription: {
        type: sequelize.TEXT,
      },
      description: {
        type: sequelize.TEXT,
        allowNull: false,
      },
      productUrl: {
        type: sequelize.STRING,
      },
      category: {
        type: sequelize.ARRAY(sequelize.STRING),
      },
      tags: {
        type: sequelize.ARRAY(sequelize.STRING),
      },
      createdBy: {
        type: sequelize.BIGINT,
        references: {
          model: 'User',
          key: 'id',
        },
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
    await queryInterface.dropTable('Project');
  },
};
