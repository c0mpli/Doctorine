const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const env = require("./env");
var bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://doctorine-node.onrender.com",
    exposedHeaders: "token",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("./middlewares/auth"));
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Connected to database!"))
  .catch((error) => console.log("Failed to connect to database!", error));

app.use("/user", require("./routes/user"));
app.use("/hospital", require("./routes/hospital"));

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server started");
});
