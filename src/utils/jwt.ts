import { sign, verify } from "jsonwebtoken"

export const createToken = (userID: string) =>
  sign(userID, process.env.JWT_SECRET, { expiresIn: "24h" })

export const verifyToken = (token: string) =>
  verify(token, process.env.JWT_SECRET) as string
