import { connectToDatabase } from "@/lib/mongodb"
import { withSession } from "@/lib/session"
import { createToken } from "@/utils/jwt"

const handler = withSession(async (req, res) => {
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase()
      const code = req.session.get<string>("code")
      const phoneNumber = req.session.get<string>("phoneNumber")

      if (code !== req.body.otp) {
        return res.status(400).json({ messsage: "Wrong pin code" })
      }

      const user = await db.collection("users").findOne({ phoneNumber })

      const token = createToken(user?._id)

      res.json({ token })
    } catch (error) {
      console.log(error.message)
      res.end("Something went wrong!")
    }
  }
})

export default handler
