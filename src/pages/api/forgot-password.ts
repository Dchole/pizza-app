import Nexmo from "nexmo"
import { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "@/lib/mongodb"
import { formatMobile } from "@/utils/format-mobile"
import { withSession } from "@/lib/session"

const handler = withSession(async (req, res) => {
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase()
      const { phoneNumber }: { phoneNumber: string } = req.body
      const users = db.collection("users")

      const userExists = users.findOne({ phoneNumber })

      if (!userExists)
        return res
          .status(400)
          .json({ message: "Can't find user with phone number" })

      const nexmo = new Nexmo({
        apiKey: process.env.NEXMO_API_KEY,
        apiSecret: process.env.NEXMO_API_SECRET,
        applicationId: process.env.NEXMO_APPLICATION_ID,
        privateKey: "./private.key"
      })

      const code = Math.floor(Math.random() * 9999)
      const receipient = formatMobile(phoneNumber)

      const from = "Moshood Pizza"
      const to = receipient
      const text = `Confirmation code: ${code}`

      return nexmo.message.sendSms(
        from,
        to,
        text,
        {},
        async (err, responseData) => {
          if (err) {
            throw new Error(err.error_text)
          } else {
            if (responseData.messages[0]["status"] === "0") {
              req.session.set("code", code)
              await req.session.save()

              return res.json({ message: "Message sent successfully" })
            } else {
              return res.status(400).json({
                message: `Message failed with error: ${responseData.messages[0]["error-text"]}`
              })
            }
          }
        }
      )
    } catch (error) {
      console.log(error.message)
      res.end("Something went wrong!")
    }
  }
})

export default handler
