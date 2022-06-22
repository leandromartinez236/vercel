const { User } = require("../models/user.model");

const checkDuplicateEmail = async (req, res, next) => {
  try {
    const emailAlreadyExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (emailAlreadyExists)
      return res.status(400).json({ message: 'The email already exists"' });
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};
const validatePassword = (req, res, next) => {
  const { password } = req.body;
  let espacios = false;
  let cont = 0;
  while (!espacios && cont < password?.length) {
    if (password?.charAt(cont) == " ") espacios = true;
    cont++;
  }
  if (espacios) {
    return res.status(400).json({
      message: "The password cannot contain spaces",
    });
  }
  next();
};

module.exports = {
  checkDuplicateEmail,
  validatePassword,
};
