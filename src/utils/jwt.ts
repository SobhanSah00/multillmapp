import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({
  path : "./.env"
})

// const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || "myAccessSecret";
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || "myRefreshSecret";

export const genreateAccessTokenAndRefreshToken = (userId: string, email: string) => {
  const accessToken = jwt.sign(
    {
      userId, email
    },
    ACCESS_SECRET,
    {
      expiresIn: '1d'
    }
  )

  const refreshToken = jwt.sign(
    {
      userId, email
    },
    REFRESH_SECRET,
    {
      expiresIn: '7d'
    }
  )

  return {
    accessToken, refreshToken
  }
}

export const verifyAccessToken = (token: string) => {
  console.log(ACCESS_SECRET)
  return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET);
};