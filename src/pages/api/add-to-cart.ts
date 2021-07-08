import { IUser } from "@/hooks/useUser"
import { connectToDatabase } from "@/lib/mongodb"
import { withSession } from "@/lib/session"
import { ObjectID } from "mongodb"

export default withSession(async (req, res) => {
  if (req.method === "POST") {
    const { db } = await connectToDatabase()

    try {
      const userSession = req.session.get<IUser>("user")
      if (!userSession) throw new Error("Unauthenticated")

      const { value } = await db
        .collection("users")
        .findOneAndUpdate(
          { _id: new ObjectID(userSession._id) },
          { $set: { cart: req.body } },
          { returnDocument: "after" }
        )

      res.json(value.cart)
    } catch (error) {
      console.log(error.message)
      res.end("Something went wrong!")
    }
  }
})
