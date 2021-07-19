import { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "@/lib/mongodb"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { db } = await connectToDatabase()
    const { email } = req.body
    const newsletter = db.collection("newsletter")

    try {
      const emailExists = await newsletter.findOne({ email })

      if (emailExists) {
        return res.status(400).json({ errorMsg: "Email already subscribed" })
      }

      const result = await db.collection("newsletter").insertOne({ email })

      res.json(result)
    } catch (error) {
      console.log(error.message)
      res.end("Something went wrong!")
    }
  }
}

export default handler
