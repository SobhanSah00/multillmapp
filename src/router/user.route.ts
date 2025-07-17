import { Router } from "express";
import { getCurrentUser } from "../controller/user.controller";
import { requireAuth } from "../middlewares/auth.middlware";

const router = Router();

router.route('/me').get(requireAuth, getCurrentUser)

export default router;