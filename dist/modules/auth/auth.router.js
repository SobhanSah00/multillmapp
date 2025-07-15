"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.route('/signup').post(auth_controller_1.signupHandler);
router.route('/login').post(auth_controller_1.loginHandler);
exports.default = router;
