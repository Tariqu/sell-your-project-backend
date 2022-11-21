const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = bcrypt.hashSync(
      process.env.DEV_DATABASE_DEFAULT_PASS,
      10
    );
    return queryInterface.bulkInsert('User', [
      {
        userType: '0',
        firstName: 'Tarique',
        lastName: 'Akhtar',
        email: 'dev-admin@yopmail.com',
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
