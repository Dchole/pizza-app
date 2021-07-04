import { NextApiRequest, NextApiResponse } from "next"
import { Session, withIronSession } from "next-iron-session"

export interface IReq extends NextApiRequest {
  session: Session
}

type THandler = (req: IReq, res: NextApiResponse) => Promise<void>

export function withSession(handler: THandler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "auth",
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict"
    }
  })
}
