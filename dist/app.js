"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config({
    path: "./.env"
});
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: true, limit: "16mb" }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const auth_route_1 = __importDefault(require("./router/auth.route"));
const user_route_1 = __importDefault(require("./router/user.route"));
app.use('/api/v1/auth', auth_route_1.default);
app.use('/api/v1/user', user_route_1.default);
exports.default = app;
