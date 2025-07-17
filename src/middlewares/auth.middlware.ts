import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt"

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
    console.log("hello i am inside the require auth");
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'Unauthorized'
        })
    }

    const token = authHeader.split(' ')[1];
    console.log(token);

    try {
        const decoded = verifyToken(token) as { userId: string }
        console.log("Decoded as JWT : " + decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}