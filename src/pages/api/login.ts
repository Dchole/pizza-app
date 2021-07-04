import { withSession } from "@/lib/session"
import { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "@/lib/mongodb"
import { Session } from "next-iron-session"
import { Db } from "mongodb"
import { compare } from "bcryptjs"

export interface IReq extends NextApiRequest {
  session: Session
}

export default withSession(
  async (req: IReq, res: NextApiResponse<Record<string, any>>) => {
    const { db } = await connectToDatabase()

    try {
      const user = await db
        .collection("users")
        .findOne({ phoneNumber: req.body.phoneNumber })

      if (!user)
        res.status(400).json({
          key: "phoneNumber",
          message: "No account with this Phone Number"
        })

      const isPasswordValid = await compare(req.body.password, user.password)

      if (!isPasswordValid)
        res.status(400).json({
          key: "password",
          message: "Password Incorrect"
        })

      const userSession = { isLoggedIn: true, ...user }

      await req.session.set("user", userSession)
      await req.session.save()

      res.json(userSession)
    } catch (error) {
      console.log(error.message)
      res.end("Something went wrong!")
    }
  }
)
