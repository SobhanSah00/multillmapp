import { Request,Response } from "express";
import * as AuthService from "./auth.service"

export const signupHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email,password);
    const result = await AuthService.signup(email, password);
    res.json(result);
  } catch (err : any) {
    res.status(400).json({ error: err.message });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    res.json(result);
  } catch (err : any) {
    res.status(400).json({ error: err.message });
  }
};