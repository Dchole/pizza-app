import { genSalt, hash } from "bcryptjs"
import { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "@/lib/mongodb"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { db } = await connectToDatabase()

    try {
      const salt = await genSalt(10)
      req.body.password = await hash(req.body.password, salt)

      const result = await db
        .collection("users")
        .insertOne({ ...req.body, authMethod: "local" })

      res.json(result)
    } catch (error) {
      console.log(error.message)
      res.end("Something went wrong!")
    }
  }
}

export default handler
