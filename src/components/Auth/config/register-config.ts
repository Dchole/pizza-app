import { FormikHelpers } from "formik"
import Router from "next/router"
import * as Yup from "yup"

export const initialValues = {
  accountName: "",
  phoneNumber: "",
  password: ""
}

export type TValues = typeof initialValues

export const validationSchema = Yup.object().shape({
  accountName: Yup.string().required().min(3).label("Account Name"),
  phoneNumber: Yup.string().required().label("Phone Number"),
  password: Yup.string().min(8).required().label("Password")
})

export const handleSubmit = async (
  values: TValues,
  actions: FormikHelpers<TValues>,
  mobile: boolean
) => {
  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    })

    if (!res.ok) {
      throw new Error("")
    }

    Router.push(mobile ? "/login" : "#login")
  } catch (error) {
    console.log(error)
  } finally {
    actions.setSubmitting(false)
  }
}
