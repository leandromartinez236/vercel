const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      min: 2,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { args: true, msg: "Name is required" },
        len: {
          args: [2, 100],
          msg: "Name is short",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      // allowNull: false,
      validate: {
        isEmail: { args: true, msg: "Please enter a valid email" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isMin(value) {
          if (value.length < 6) throw new Error("Password 6 characters");
        },
        notEmpty: {
          args: true,
          msg: "Enter your password",
        },
      },
    },
  },
  {
    timestamps: false,
    hooks: {
      async beforeCreate(user) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
      },
    },
  }
);

module.exports = {
  User,
};
