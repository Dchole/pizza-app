import { NextApiRequest, NextApiResponse } from "next"
import { withIronSession } from "next-iron-session"

type THandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>

export function withSession(handler: THandler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "next.js/examples/with-iron-session",
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === "production" ? true : false,
      httpOnly: true,
      sameSite: "strict"
    }
  })
}
