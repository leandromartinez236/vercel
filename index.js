const app = require("./app");
const { sequelize } = require("./api/database/db");

const main = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Connection has been established successfully");
    app.listen(3000);
    console.log("Server running on port", 3000);
  } catch (error) {
    console.log("Unable to connect to the database", error);
  }
};

main();
