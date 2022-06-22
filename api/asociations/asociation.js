const { User } = require("../models/user.model");
const { Ticket } = require("../models/ticket.model");

User.hasMany(Ticket, { foreignKey: "user_id", sourceKey: "id" });
Ticket.belongsTo(User, { foreignKey: "user_id", targetId: "id" });
