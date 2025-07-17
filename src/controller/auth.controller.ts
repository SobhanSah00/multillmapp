import { Request,Response } from "express";
import {signup,login} from "./auth.service"

export const signupHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email,password);
    const result = await signup(email, password,res);
    res.json(result);
  } catch (err : any) {
    res.status(400).json({ error: err.message });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if(!email || !password) return res.json({
      error : "Please provide the email and password"
    })

    const result = await AuthService.login(email, password);
    res.json(result);
  } catch (err : any) {
    res.status(400).json({ error: err.message });
  }
};