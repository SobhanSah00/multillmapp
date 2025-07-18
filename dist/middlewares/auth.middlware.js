"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jwt_1 = require("../utils/jwt");
const requireAuth = (req, res, next) => {
    var _a;
    let token;
    token = req.cookies['access_token'];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token found" });
    }
    try {
        const decoded = (0, jwt_1.verifyAccessToken)(token);
        console.log(req.user);
        console.log((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
        console.log(typeof decoded);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
exports.requireAuth = requireAuth;
