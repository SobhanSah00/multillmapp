import {PrismaClient} from "@prisma/client"
import {hashPassword,coparePassword} from "../utils/hash"
import {generateToken} from "../utils/jwt"

const prisma = new PrismaClient();

export const signup = async (email: string, password: string) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('Email already exists');

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({ data: { email, password: hashed } });
  const token = generateToken({ userId: user.id });
  return { token };
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const isValid = await coparePassword(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  const token = generateToken({ userId: user.id });
  return { token };
};