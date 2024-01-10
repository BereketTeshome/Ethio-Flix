require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./connect");
const userRouter = require("./routes/users");
const reviewRouter = require("./routes/reviewRoute");
const favoriteRouter = require("./routes/favRoute");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api", reviewRouter);
app.use("/api", favoriteRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const start = async () => {
  const port = 3001;
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.error(error);
  }
};

start();
