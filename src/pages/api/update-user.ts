import { withSession } from "@/lib/session"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectID } from "mongodb"
import { IUser } from "@/hooks/useUser"

export default withSession(async (req, res) => {
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase()
      const currentUser = req.session.get<IUser>("user")

      const { value } = await db
        .collection("users")
        .findOneAndUpdate(
          { _id: new ObjectID(currentUser?._id) },
          { $set: req.body },
          { returnDocument: "after" }
        )

      req.session.set("user", value)
      await req.session.save()

      res.json(value)
    } catch (error) {
      console.log(error.message)
      res.end("Something went wrong!")
    }
  }
})
