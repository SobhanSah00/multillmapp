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
exports.login = exports.signup = void 0;
const client_1 = require("@prisma/client");
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
const prisma = new client_1.PrismaClient();
const genreateAccessTokenAndRefreshToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique(userId);
        if (!user) {
            return;
        }
        const accessToken = (0, jwt_1.generateAccessToken)(userId);
        const refreshToken = (0, jwt_1.generateRefreshToken)(userId);
        yield prisma.user.update({
            where: {
                id: userId
            },
            data: {
                refreshToken: refreshToken
            }
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    catch (error) {
        console.error('Error generating tokens:', error);
        throw error;
    }
});
const signup = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prisma.user.findUnique({ where: { email } });
    if (existing)
        throw new Error('Email already exists');
    const hashed = yield (0, hash_1.hashPassword)(password);
    const user = yield prisma.user.create({ data: { email, password: hashed } });
    const token = genreateAccessTokenAndRefreshToken({ userId: user.id });
    return { user, token };
});
exports.signup = signup;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new Error('Invalid credentials');
    const isValid = yield (0, hash_1.coparePassword)(password, user.password);
    if (!isValid)
        throw new Error('Invalid credentials');
    const token = genreateAccessTokenAndRefreshToken({ userId: user.id });
    return { token };
});
exports.login = login;
