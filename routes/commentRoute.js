import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controller/commentController.js";

const router = Router();
router.post("/create_comment", createComment);
router.put("/:id", updateComment);
router.get("/:id?", getComments);
router.delete("/:id", deleteComment);

export default router;
