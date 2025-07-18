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
exports.loginHandler = exports.signupHandler = void 0;
const db_1 = require("../config/db");
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
const token_1 = require("../utils/token");
const signupHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            return res.json({
                error: "Give all Information"
            });
        }
        const existingUser = yield db_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already registered.' });
        }
        const hashedPassword = yield (0, hash_1.hashPassword)(password);
        const user = yield db_1.prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });
        if (!user)
            return res.json({
                error: "error is comming while creating user ."
            });
        const tokens = (0, jwt_1.genreateAccessTokenAndRefreshToken)(user.id, user.email);
        yield (0, token_1.storeRefreshToken)(user.id, tokens.refreshToken);
        // setAuthCookies(res, tokens)
        res.cookie('access_token', tokens.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.cookie('refresh_token', tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(201).json({ message: "Sign up successfully." });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.signupHandler = signupHandler;
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.json({
                error: "Please provide the email and password"
            });
        const user = yield db_1.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user)
            throw new Error('Invalid Credential .');
        const isValid = yield (0, hash_1.coparePassword)(password, user.password);
        if (!isValid)
            throw new Error('Invalid credentials');
        const tokens = (0, jwt_1.genreateAccessTokenAndRefreshToken)(user.id, user.email);
        yield (0, token_1.storeRefreshToken)(user.id, tokens.refreshToken);
        // setAuthCookies(res, tokens)
        res.cookie('access_token', tokens.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 15 minutes
        });
        res.cookie('refresh_token', tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.json({ message: "login successfully ." });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.loginHandler = loginHandler;
