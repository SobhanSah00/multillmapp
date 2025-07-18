import { Router } from "express";
import { signupHandler,loginHandler } from "../controller/auth.controller";

const router = Router()

router.route('/signup').post(signupHandler)
router.route('/login').post(loginHandler)

export default router