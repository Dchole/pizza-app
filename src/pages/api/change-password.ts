import { connectToDatabase } from "@/lib/mongodb"
import { withSession } from "@/lib/session"
import { IUser } from "@/hooks/useUser"
import { compare, genSalt, hash } from "bcryptjs"
import { ObjectID } from "mongodb"
import { verifyToken } from "@/utils/jwt"

const handler = withSession(async (req, res) => {
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase()
      const { token } = req.query

      const userID = token ? verifyToken(token as string) : null

      const {
        currentPassword,
        newPassword
      }: { currentPassword?: string; newPassword: string } = req.body
      const userSession = req.session.get<IUser>("user")
      const users = db.collection("users")

      const user = await users.findOne({
        _id: new ObjectID(userID || userSession?._id)
      })

      if (currentPassword) {
        const validPassword = await compare(currentPassword, user.password)
        if (!validPassword)
          return res.status(400).json({ message: "Wrong Password" })
      }

      const salt = await genSalt(10)
      const hashedPassword = await hash(newPassword, salt)

      const { result } = await users.updateOne(
        { _id: new ObjectID(user?._id) },
        { $set: { password: hashedPassword } }
      )

      res.json(result)
    } catch (error) {
      console.log(error.message)
      res.end("Something went wrong!")
    }
  }
})

export default handler
