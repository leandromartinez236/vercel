const Sequelize = require("sequelize");
const pg = require("pg");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    dialectModule: pg,
    dialect: "postgres",
  }
);

module.exports = {
  sequelize,
};
