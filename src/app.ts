import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

dotenv.config({
  path: "./.env"
})

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true, limit: "16mb" }));
app.use(express.json());
app.use(cookieParser());

import authRouter from "./router/auth.route"
import userRouter from "./router/user.route"

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)

export default app