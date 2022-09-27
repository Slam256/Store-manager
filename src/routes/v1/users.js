import { Router } from "express";
import UserController from "../../controllers/user.js";
import verifyToken from "../../middleware/authorization.js";

const router = Router();

// open create initial store owner/ admin account
router.post("/initsign", UserController.initSign);

// protected route for only admins or a store owner
router.post("/register", verifyToken, UserController.registerUser);

// not protected
router.post("/login", UserController.loginUser);

// must be signed in to logout
router.post("/signout", UserController.logoutUser);

export default router;
