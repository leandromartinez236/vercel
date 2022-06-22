const { Ticket } = require("../models/ticket.model");

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    if (tickets.length === 0)
      return res.status(204).json({ message: "No content" });
    const response = {
      message: "Get tickets successfully",
      request: {
        type: "GET",
        url: "http://localhost:3000/api/tickets",
      },
      count: tickets.length,
      tickets: tickets,
    };
    res.status(200).json(response);
  } catch (error) {
    return res.stauts(500).json(error);
  }
};
const getIncomes = async (req, res) => {
  const incomes = await Ticket.findAll({ where: { type: "incomes" } });
  if (incomes.length === 0) return res.status(204).send("No content");
  const response = {
    message: "Success",
    request: {
      type: "GET",
      url: "http://localhost:3000/api/tickets/incomes",
    },
    tickets: incomes,
  };
  res.status(200).json(response);
};

const getEgress = async (req, res) => {
  const egress = await Ticket.findAll({ where: { type: "egress" } });
  if (egress.length === 0) return res.status(204).send("No content");
  const response = {
    message: "Success",
    request: {
      type: "GET",
      url: "http://localhost:3000/api/tickets/egress",
    },
    tickets: egress,
  };
  res.status(200).json(response);
};

const getOneTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ where: { id: req.params.ticketId } });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    const response = {
      message: "Get ticket successfully",
      request: {
        type: "GET",
        url: "http://localhost:3000/api/tickets/" + req.params.ticketId,
      },
      ticket: ticket,
    };
    res.status(200).json(response);
  } catch (error) {
    return res.json(error.message);
  }
};

const createTicket = async (req, res) => {
  try {
    const { title, date, type, category, id } = req.body;
    let cash = req.body.cash === null ? 0 : req.body.cash;
    const ticket = await Ticket.create({
      user_id: id,
      title,
      cash,
      date,
      type,
      category,
    });
    const response = {
      message: "Ticket created successfully",
      request: {
        type: "POST",
        url: "http://localhost:3000/api/tickets",
      },
      ticket: ticket,
    };
    res.status(201).json(response);
  } catch (error) {
    return res.json(error.message);
  }
};

const updateTicket = async (req, res) => {
  const { ...ticketValues } = req.body;
  try {
    if (req.body.type) {
      return res
        .status(403)
        .json({ message: 'No se puede cambiar el "type" una vez creado' });
    }
    const updatedTicket = await Ticket.update(
      { ...ticketValues },
      { where: { id: req.params.ticketId } }
    );
    res.status(204).json(updatedTicket);
  } catch (error) {
    return res.json(error.message);
  }
};

const deleteTicket = async (req, res) => {
  try {
    const deletedTicket = await Ticket.destroy({
      where: { id: req.params.ticketId },
    });
    if (!deletedTicket)
      return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json({ message: "Deleted ticket" });
  } catch (error) {
    return res.json(error.message);
  }
};
module.exports = {
  getTickets,
  createTicket,
  updateTicket,
  getOneTicket,
  deleteTicket,
  getIncomes,
  getEgress,
};
