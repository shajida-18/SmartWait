const express = require("express");
const router = express.Router();

const Queue = require("../models/Queue");

// GET ALL QUEUES
router.get("/", async (req, res) => {
  try {
    const queues = await Queue.find();

    res.json(queues);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// GET SINGLE QUEUE
router.get("/:id", async (req, res) => {
  try {
    const queue = await Queue.findById(req.params.id);

    if (!queue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }

    res.json(queue);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// CREATE QUEUE
router.post("/create", async (req, res) => {
  try {
    const { name, users } = req.body;

    const queue = new Queue({
      name,
      users: users || [],
    });

    await queue.save();

    res.json(queue);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
// JOIN QUEUE
router.post("/join/:id", async (req, res) => {
  try {
    const { userId } = req.body;

    const queue = await Queue.findById(req.params.id);

    if (!queue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }

    // ADD USER TO QUEUE
    queue.users.push(userId);

    await queue.save();

    res.json({
      message: "Joined Queue",
      users: queue.users,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// NEXT USER
router.post("/next/:id", async (req, res) => {
  const queue = await Queue.findById(req.params.id);

  if (queue.users.length > 0) {
    queue.users.shift();
  }

  await queue.save();

  res.json({
    message: "Next User Called",
  });
});

// CLEAR QUEUE
router.put("/clear/:id", async (req, res) => {
  try {
    const queue = await Queue.findById(req.params.id);

    if (!queue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }

    queue.peopleCount = 0;

    await queue.save();

    res.json({
      message: "Queue Cleared",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// DELETE QUEUE
router.delete("/:id", async (req, res) => {
  try {
    await Queue.findByIdAndDelete(req.params.id);

    res.json({
      message: "Queue Deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
