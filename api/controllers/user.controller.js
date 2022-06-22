const { User } = require("../models/user.model");
const { Ticket } = require("../models/ticket.model");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: { model: Ticket } });
    if (users.length === 0)
      return res.status(204).json({ message: "No content" });
    const response = {
      message: "Get users successfully",
      request: {
        type: "GET",
        url: "http://localhost:3000/api/users",
      },
      count: users.length,
      users: users,
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

const getOneUser = async (req, res) => {
  try {
    const userFound = await User.findOne({
      where: { id: req.params.userId },
      include: { model: Ticket },
    });
    if (!userFound) return res.status(404).json({ message: "User not found" });
    const response = {
      message: "get user successfully",
      request: {
        type: "GET",
        url: "http://localhost:3000/api/users/" + req.params.userId,
      },
      user: userFound,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
    });
    const response = {
      message: "User created successfully",
      request: {
        type: "POST",
        url: "http://localhost:3000/api/users",
      },
      user: newUser,
    };
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json(error.errors);
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { ...data } = req.body;
  try {
    const updatedUser = await User.update(
      { ...data },
      {
        where: { id: userId },
        //  returning: true
      }
    );
    return res.status(200).json({ message: "Updated user" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({ where: { id: req.params.userId } });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "Deleted User" });
  } catch (error) {
    return res.json(error.errors);
  }
};
module.exports = {
  createUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
