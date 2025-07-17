import jwt from "jsonwebtoken"

// const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const genreateAccessTokenAndRefreshToken = (userId : string,email : string) => {
  const accessToken = jwt.sign(
    {
      userId,email
    },
    ACCESS_SECRET,
    {
      expiresIn : '1d'
    }
  )

  const refreshToken = jwt.sign(
    {
      userId,email
    },
    REFRESH_SECRET,
    {
      expiresIn : '7d'
    }
  )

  return {
    accessToken,refreshToken
  }
} 

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET);
};