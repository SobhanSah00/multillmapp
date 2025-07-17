"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = void 0;
const db_1 = require("../../config/db");
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("i am in getCurrent USER");
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    console.log(userId);
    if (!userId) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }
    const user = yield db_1.prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            email: true,
            createdAt: true
        }
    });
    if (!user) {
        return res.status(404).json({
            error: "User not found"
        });
    }
    res.json(user);
});
exports.getCurrentUser = getCurrentUser;
