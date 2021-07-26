import { FormikHelpers } from "formik"
import Router from "next/router"
import * as Yup from "yup"

export const initialValues = {
  phoneNumber: ""
}

export type TValues = typeof initialValues

export const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string().required().label("Phone Number")
})

export const handleSubmit = async (
  values: TValues,
  actions: FormikHelpers<TValues>
) => {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    })

    if (!res.ok) {
      throw new Error("")
    }

    const user = await res.json()

    Router.push("/.well-known/change-password")
  } catch (error) {
    console.log(error)
  } finally {
    actions.setSubmitting(false)
  }
}
