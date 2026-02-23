import express from "express";
import {
  createSnippet,
  getSnippet,
  updateSnippet,
  cleanupSnippets,
} from "../controllers/snippetController.js";

const router = express.Router();

router.post("/", createSnippet); // Create
router.get("/:id", getSnippet); // Read
router.put("/:id", updateSnippet); // Update
router.delete("/cleanup", cleanupSnippets); // Delete expired

export default router;
