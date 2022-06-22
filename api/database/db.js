const { Sequelize } = require("sequelize");
require("dotenv").config();
const pg = require("pg");
const sequelize = new Sequelize(
  process.env.DB,
  // process.env.USER,
  // process.env.PASSWORD,
  {
    dialectModule: pg,
    dialect: "postgres",
  }
);

const main = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Connection has been established successfully");
    // app.listen(3000);
    console.log("Server running on port", 3000);
  } catch (error) {
    console.log("Unable to connect to the database", error);
  }
};

main();

module.exports = sequelize;
