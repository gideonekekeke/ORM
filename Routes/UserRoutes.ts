import express from "express";
import {
	createUser,
	createUserProfile,
	DeleteUser,
	GetAll,
	getOneUser,
	UpdateUser,
} from "../Controllers/UserController";
const router = express.Router();

router.post("/create", createUser);
router.get("/", GetAll);
router.post("/profile/:id", createUserProfile);
router.get("/:id", getOneUser);
router.patch("/update/:id", UpdateUser);
router.delete("/del/:id", DeleteUser);

export default router;
