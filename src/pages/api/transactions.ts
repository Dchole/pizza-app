import { withSession } from "@/lib/session"
import { connectToDatabase } from "@/lib/mongodb"
import { IUser } from "@/hooks/useUser"
import { ObjectID } from "mongodb"

export default withSession(async (req, res) => {
  const { db } = await connectToDatabase()
  const user = req.session.get<IUser>("user")
  const transactions = db.collection("transactions")
  const userID = new ObjectID(user?._id)

  switch (req.method) {
    case "POST": {
      try {
        const {
          ops: [result]
        } = await transactions.insertOne({
          userID,
          ...req.body,
          createdAt: new Date()
        })

        res.json(result)
      } catch (error) {
        console.log(error.message)
        res.end("Something went wrong!")
      }

      break
    }

    case "GET": {
      try {
        const result = await transactions.find({ userID }).toArray()

        if (!result) throw new Error()

        res.json(
          result.map(transaction => {
            const { userID: id, ...rest } = transaction
            return rest
          })
        )
      } catch (error) {
        console.log(error.message)
        res.status(500).end("Something went wrong!")
      }
    }

    default:
      res.end()
  }
})
