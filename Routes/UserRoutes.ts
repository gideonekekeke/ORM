import express from "express";
import {
	CreateBook,
	createUser,
	createUserProfile,
	// DeleteUser,
	DeleteUserProfile,
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
// router.delete("/del/:id", DeleteUser);
router.delete("/del/profile/:id/:profileId", DeleteUserProfile);

router.post("/book/:id", CreateBook);

export default router;
