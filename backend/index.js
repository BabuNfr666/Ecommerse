const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db");
const router = require("./routes/index");

require("dotenv").config();

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const PORT = 8080 || process.env.PORT;

connectDb();
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
