const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const revalidator = require('revalidator');

const sequelize = require('../../config/database');
const AppError = require('../../utils/appError');

const schemaValidator = (schema) => {
  return (value) => {
    const results = revalidator.validate(value, schema);
    if (!results.valid) {
      let message = '';
      results.errors.forEach((val) => {
        message += val.message + ' ';
      });
      throw new AppError(message, 400);
    }
  };
};

const User = sequelize.define(
  'User',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    userType: {
      // 0: admin, 1: seller, 2: buyer
      type: DataTypes.ENUM('0', '1', '2'),
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required',
        },
        notEmpty: {
          msg: 'Please provide a password',
        },
      },
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      set(val) {
        if (val === this.password) {
          const hashedPassword = bcrypt.hashSync(val, 10);
          this.setDataValue('password', hashedPassword);
          this.setDataValue('confirmPassword', hashedPassword);
        }
      },
      validate: {
        notNull: {
          msg: 'Both passwords must match',
        },
      },
    },
    profilePic: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.JSONB,
      allowNull: false,
      validate: {
        schema: schemaValidator({
          type: 'object',
          properties: {
            streetAddress: { type: 'string', required: true },
            city: { type: 'string', required: true },
            state: { type: 'string', required: true },
            zipcode: {
              type: 'number',
              required: true,
              maxLength: 6,
              minLength: 6,
            },
            country: { type: 'string', required: true },
          },
        }),
      },
    },
  },
  {
    paranoid: true,
    modelName: 'User',
    freezeTableName: true,
  }
);

User.prototype;

module.exports = User;
