import { IUser } from "@/hooks/useUser"
import { connectToDatabase } from "@/lib/mongodb"
import { withSession } from "@/lib/session"
import { ObjectID } from "mongodb"

export default withSession(async (req, res) => {
  const { db } = await connectToDatabase()

  try {
    const userSession = req.session.get<IUser>("user")
    if (!userSession) throw new Error("Unauthenticated")

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectID(userSession._id) })
    if (!user) throw new Error()

    res.json(user.cart)
  } catch (error) {
    console.log(error.message)
    res.end(error.message || "Something went wrong")
  }
})
