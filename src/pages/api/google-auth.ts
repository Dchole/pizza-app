import { IReq, withSession } from "@/lib/session"
import { NextApiResponse } from "next"
import { connectToDatabase } from "@/lib/mongodb"

export default withSession(async (req: IReq, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase()
      let user = await db.collection("users").findOne({ email: req.body.email })

      if (!user) {
        const { ops } = await db
          .collection("users")
          .insertOne({ ...req.body, authMethod: "google" })

        user = {
          accountName: "",
          phoneNumber: "",
          location: "",
          address: "",
          ...ops[0]
        }
      }

      const userSession = { isLoggedIn: true, ...user }

      await req.session.set("user", userSession)
      await req.session.save()

      res.json(userSession)
    } catch (error) {
      console.log(error.message)
      res.end("Something went wrong!")
    }
  }
})
