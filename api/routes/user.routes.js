const router = require("express").Router();
const { verifySignup } = require("../middlewares/index");
const {
  createUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

router.get("/", getUsers);
router.get("/:userId", getOneUser);
router.post(
  "/",
  [verifySignup.checkDuplicateEmail, verifySignup.validatePassword],
  createUser
);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
