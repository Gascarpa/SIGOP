const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const { createOccurrence, getOccurrence, deleteOccurrence, getOccurrenceById, updateOccurrence } = require("../controllers/occurrenceController");

router.post("/", authMiddleware, createOccurrence);
router.get("/", authMiddleware, getOccurrence);
router.get("/:id", authMiddleware, getOccurrenceById);
router.put("/:id", authMiddleware, updateOccurrence);
router.delete("/:id", authMiddleware, deleteOccurrence);

module.exports = router;