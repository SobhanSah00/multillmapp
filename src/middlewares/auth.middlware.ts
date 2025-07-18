import { Request, Response, NextFunction } from "express"
import { verifyAccessToken } from "../utils/jwt"

export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string
    }
}

export const requireAuth = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    let token: string | undefined;

    token = req.cookies['access_token'];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token found" });
    }

    try {
        const decoded = verifyAccessToken(token) as { userId: string };
        console.log(req.user);
        console.log(req.user?.userId)
        console.log(typeof decoded)
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
