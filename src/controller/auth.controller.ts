import { Request, Response } from "express";
import { prisma } from "../config/db"
import { hashPassword, coparePassword } from "../utils/hash"
import { genreateAccessTokenAndRefreshToken } from "../utils/jwt";
import { storeRefreshToken } from "../utils/token";
import { setAuthCookies } from "../utils/cookie";

export const signupHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.json({
        error: "Give all Information"
      })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });


    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    })

    if (!user) return res.json({
      error: "error is comming while creating user ."
    })

    const tokens = genreateAccessTokenAndRefreshToken(user.id, user.email)
    await storeRefreshToken(user.id, tokens.refreshToken);

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
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.json({
      error: "Please provide the email and password"
    })

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) throw new Error('Invalid Credential .');

    const isValid = await coparePassword(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    const tokens = genreateAccessTokenAndRefreshToken(user.id, user.email)
    await storeRefreshToken(user.id, tokens.refreshToken);

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

    res.json({ message: "login successfully ." })
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};