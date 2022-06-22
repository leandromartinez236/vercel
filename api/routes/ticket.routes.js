const router = require("express").Router();
const {
  getTickets,
  createTicket,
  updateTicket,
  getOneTicket,
  deleteTicket,
  getEgress,
  getIncomes,
} = require("../controllers/ticket.controller");

router.get("/", getTickets);
router.get("/egress", getEgress);
router.get("/incomes", getIncomes);
router.get("/:ticketId", getOneTicket);
router.post("/", createTicket);
router.put("/:ticketId", updateTicket);
router.delete("/:ticketId", deleteTicket);

module.exports = router;
