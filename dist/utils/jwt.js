"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.genreateAccessTokenAndRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: "./.env"
});
// const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || "myAccessSecret";
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || "myRefreshSecret";
const genreateAccessTokenAndRefreshToken = (userId, email) => {
    const accessToken = jsonwebtoken_1.default.sign({
        userId, email
    }, ACCESS_SECRET, {
        expiresIn: '1d'
    });
    const refreshToken = jsonwebtoken_1.default.sign({
        userId, email
    }, REFRESH_SECRET, {
        expiresIn: '7d'
    });
    return {
        accessToken, refreshToken
    };
};
exports.genreateAccessTokenAndRefreshToken = genreateAccessTokenAndRefreshToken;
const verifyAccessToken = (token) => {
    console.log(ACCESS_SECRET);
    return jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
};
exports.verifyRefreshToken = verifyRefreshToken;
