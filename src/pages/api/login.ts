import { IReq, withSession } from "@/lib/session"
import { NextApiResponse } from "next"
import { connectToDatabase } from "@/lib/mongodb"
import { compare } from "bcryptjs"

export default withSession(
  async (req: IReq, res: NextApiResponse<Record<string, any>>) => {
    if (req.method === "POST") {
      const { db } = await connectToDatabase()

      try {
        const { password, ...user } = await db
          .collection("users")
          .findOne({ phoneNumber: req.body.phoneNumber })

        if (!user)
          res.status(400).json({
            key: "phoneNumber",
            message: "No account with this Phone Number"
          })

        const isPasswordValid = await compare(req.body.password, password)

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
  }
)
