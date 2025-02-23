import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controller/userController.js";

const router = Router();
router.post("/", createUser);
router.put("/:id", updateUser);
router.get("/:id?", getUsers);
router.delete("/:id", deleteUser);

export default router;
