const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Ticket = sequelize.define("ticket", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Not-content",
  },
  cash: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  date: {
    type: DataTypes.STRING,
    defaultValue: () => {
      const date = new Date();
      return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    },
  },
  type: {
    type: DataTypes.ENUM,
    values: ["incomes", "egress"],
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM,
    values: ["food", "health", "home", "education", "hobby", "not-qualified"],
    defaultValue: "not-qualified",
  },
});

module.exports = {
  Ticket,
};
