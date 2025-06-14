const express = require("express");
const app = express();
const cors = require("cors");
const configObj = require("./config");
const connectDB = require("./config/db");
const port = configObj.port;
const userRoute = require("./routes/userRoute");
const boardRoute = require("./routes/boardRoute");
const taskRoute = require("./routes/taskRoute");
const columnsRoute = require("./routes/columnsRoute");
const errorHandler = require("./middlewares/errorHandler");

//middleware for body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Enable All CORS Requests
app.use(cors());
app.get("/api", (req, res) => {
  res.send("trello-lite-server get request!");
});

app.use("/api/user", userRoute);
app.use("/api/board", boardRoute);
app.use("/api/task", taskRoute);
app.use("/api/columns", columnsRoute);

// Register the error handler middleware
app.use(errorHandler);

const connectServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(
        `trello-lite-server app listening on http://localhost:${port}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

connectServer();
