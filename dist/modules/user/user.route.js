"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_middlware_1 = require("../middlewares/auth.middlware");
const router = (0, express_1.Router)();
router.route('/me').get(auth_middlware_1.requireAuth, user_controller_1.getCurrentUser);
exports.default = router;
