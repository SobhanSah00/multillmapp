import {prisma} from "../config/db"
import bcrypt from "bcrypt"

export const storeRefreshToken = async (userId: string, refreshToken: string) => {
  const hashedRefresh = await bcrypt.hash(refreshToken, 10);
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      refreshToken: hashedRefresh
    }
  })
}