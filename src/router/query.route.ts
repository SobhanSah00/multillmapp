import { Router } from "express"
import { requireAuth } from "../middlewares/auth.middlware"

const router = Router();

router.route("/query").post(requireAuth);

export default router