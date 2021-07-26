import Nexmo from "nexmo"
import { connectToDatabase } from "@/lib/mongodb"
import { formatMobile } from "@/utils/format-mobile"
import { withSession } from "@/lib/session"
import { IUser } from "@/hooks/useUser"
import { compare, genSalt, hash } from "bcryptjs"

const handler = withSession(async (req, res) => {
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase()
      const {
        currentPassword,
        newPassword
      }: { currentPassword: string; newPassword: string } = req.body
      const userSession = req.session.get<IUser>("user")
      const code = req.session.get<string>("code")
      const users = db.collection("users")

      const user = await users.findOne({ _id: userSession._id })
      const validPassword = await compare(currentPassword, user.password)

      if (!validPassword)
        return res.status(400).json({ message: "Wrong Password" })

      const salt = await genSalt(10)
      const hashedPassword = await hash(newPassword, salt)

      const result = await user.update({ $set: { password: hashedPassword } })
      res.json(result)
    } catch (error) {
      console.log(error.message)
      res.end("Something went wrong!")
    }
  }
})

export default handler
