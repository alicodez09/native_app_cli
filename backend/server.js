const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const userRoute = require("./routes/user");
const todoRoute = require("./routes/todo");

// credentials
dotenv.config();
// Database Connection
connectDB();
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/todo", todoRoute);

// Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`.bgWhite.bgRed);
});
