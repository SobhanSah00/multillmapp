import { PrismaClient } from "@prisma/client"
import { hashPassword, coparePassword } from "../utils/hash"
import { genreateAccessTokenAndRefreshToken } from "../utils/jwt"
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

const storeRefreshToken = async (userId: string, refreshToken: string) => {
  const hashedRefresh = await bcrypt.hash(refreshToken, 10);
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      refreshToken: hashedRefresh
    }
  })
}

const setAuthCookies = (res: Response, tokens: { accessToken: string, refreshToken: string }) => {
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
}

export const signup = async (email: string, password: string, res: Response) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (!existingUser) {
    throw new Error('Email already Registered . ')
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  })

  const tokens = genreateAccessTokenAndRefreshToken(user.id, user.email);
  await storeRefreshToken(user.id, tokens.refreshToken);

  setAuthCookies(res, tokens)

  return {
    message: "SignUp successfully ."
  }
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const isValid = await coparePassword(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');
  const token = genreateAccessTokenAndRefreshToken({ userId: user.id });
  return { token };
};