import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middlware";
import { prisma } from "../config/db"

export const getCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
    console.log("i am in getCurrent USER");

    const userId = req.user?.userId;
    console.log(userId);
    if (!userId) {
        return res.status(401).json({
            error: "Unauthorized"
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            email: true,
            createdAt: true
        }
    })

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        })
    }

    res.json(user)
}