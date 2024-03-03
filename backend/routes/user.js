const express = require("express");
const {
  Register,
  Login,
  UpdateUser,
  requireSignIn,
} = require("../controllers/user");

const router = express.Router();
// REGISTER || POST
router.post("/register", Register);
// LOGIN || POST
router.post("/login", Login);
// UPDATE || PUT
router.put("/update-user", requireSignIn, UpdateUser);

module.exports = router;
