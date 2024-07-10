const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  update,
  user
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.put("/update", update);
router.post("/user", user);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;
