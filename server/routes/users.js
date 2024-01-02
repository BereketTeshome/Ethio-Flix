const express = require("express");
const userRouter = express.Router();
const { UpdatePassword, Register, Login } = require("../controllers/users");

userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.patch("/update/:id", UpdatePassword);

module.exports = userRouter;
