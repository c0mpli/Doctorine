const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const isUser = require("../middlewares/isUser");
// const axios = require("axios");
// const cron = require("node-cron");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!password || !email || !name)
    return res.status(400).send("One or more of the fields are missing.");

  //checking for multiple accounts for a single email
  const emailcheck = await User.findOne({ email: email });
  if (emailcheck)
    return res
      .status(400)
      .send("Only one account per email address is allowed");

  // add user
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    const newUser = new User({
      password: hash,
      email,
      name,
    });
    return res.json(await newUser.save());
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send("Missing email or password");

  // checking if email exists
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("Email is incorrect");

  bcrypt.compare(password, user.password, async function (err, result) {
    if (result == false) return res.status(400).send("Incorrect password");

    // sending token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.jwtSecret,
      { expiresIn: "1d" }
    );
    res.setHeader("token", token);
    const userData = user;
    delete userData.password;
    res.json({ token, userData });
  });
});

router.get("/user", async (req, res) => {
  const user = await User.findById(req.query.id);
  res.json(user);
});

module.exports = router;
