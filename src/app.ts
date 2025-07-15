import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config({
    path : "./.env"
})

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.urlencoded({extended : true,limit : "16mb"}))
app.use(express.json())
import authRouter from "./modules/auth/auth.router"

app.use('/api/v1/auth',authRouter)
export default app