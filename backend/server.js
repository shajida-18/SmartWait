const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: ["https://smartwaittt.netlify.app"],
    credentials: true,
  }),
);
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://smartwaittt.netlify.app",
    credentials: true,
  },
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

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running on", PORT);
});
