import { Router } from "express";
import { signupHandler,loginHandler } from "./auth.controller";

const router = Router()

router.route('/signup').post(signupHandler)
router.route('/login').post(loginHandler)

export default router