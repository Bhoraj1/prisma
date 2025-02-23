import { Router } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  searchPost,
  updatePost,
} from "../controller/postController.js";

const router = Router();
router.post("/", createPost);
router.get("/search", searchPost);
router.put("/:id", updatePost);
router.get("/:id?", getPosts);
router.delete("/:id", deletePost);

export default router;
