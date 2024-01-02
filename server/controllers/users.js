const User = require("../Models/User");
const bcrypt = require("bcrypt");

const UpdatePassword = async (req, res) => {
  const id = req.params.id;
  const { password } = req.body;
  try {
    let hashedPassword = await bcrypt.hash(password, 10);
    const users = await User.findByIdAndUpdate(
      { _id: id },
      { password: hashedPassword },
      { new: true }
    );
    res.status(201).json({ status: "updated", users });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const Register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password) {
    return res.json({ error: "Please provide username and password" });
  }
  if (!email) {
    return res.json({ error: "Please provide email" });
  }

  try {
    const user = await User.create(req.body);
    const token = user.createToken();
    res.cookie("token", token);
    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      res.status(500).json({ error: "email is already used" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const Login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ error: "Please provide username and password" });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.json({ error: "Invalid username or password!" });
  }
  const compare = await user.comparePassword(password);
  if (!compare) {
    return res.json({ error: "Incorrect password!" });
  }
  try {
    const token = user.createToken();
    res.status(201).json({ user, token: token });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

module.exports = { UpdatePassword, Register, Login };
