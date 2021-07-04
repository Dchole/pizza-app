import { FormikHelpers } from "formik"
import * as Yup from "yup"

export const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  password: ""
}

export type TValues = typeof initialValues

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().min(3).label("First Name"),
  lastName: Yup.string().required().min(3).label("Last Name"),
  phoneNumber: Yup.string().required().label("Phone Number"),
  password: Yup.string().min(8).required().label("Password")
})

export const handleSubmit = async (
  values: TValues,
  actions: FormikHelpers<TValues>
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

    const data = await res.json()
    console.log({ data })
  } catch (error) {
    console.log(error)
  } finally {
    actions.setSubmitting(false)
  }
}
