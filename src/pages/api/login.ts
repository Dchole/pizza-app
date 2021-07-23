import { withSession } from "@/lib/session"
import { connectToDatabase } from "@/lib/mongodb"
import { compare } from "bcryptjs"

export default withSession(async (req, res) => {
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase()

      const user = await db
        .collection("users")
        .findOne({ phoneNumber: req.body.phoneNumber })

      if (!user)
        res.status(400).json({
          key: "phoneNumber",
          message: "No account with this Phone Number"
        })

      const { password, ...rest } = user

      const isPasswordValid = await compare(req.body.password, password)

      if (!isPasswordValid)
        res.status(400).json({
          key: "password",
          message: "Password Incorrect"
        })

      const userSession = { isLoggedIn: true, ...rest }

      req.session.set("user", userSession)
      await req.session.save()

      res.json(userSession)
    } catch (error) {
      console.log(error.message)
      res.end("Something went wrong!")
    }
  }
})
