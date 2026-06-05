const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// Socket
io.on("connection", (socket) => {
  console.log("User connected");
});

// Routes
app.use("/api/auth", require("./routes/AuthRoutes"));
app.use("/api/queue", require("./routes/QueueRoutes"));

server.listen(5000, () => console.log("Server running"));
