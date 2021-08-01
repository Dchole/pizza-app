import { FormikHelpers } from "formik"
import firebase from "@/lib/firebase"
import * as Yup from "yup"
import Router from "next/router"

export const initialValues = {
  displayName: "",
  phoneNumber: "",
  code: ""
}

export type TValues = typeof initialValues

export const validationSchema = Yup.object().shape({
  displayName: Yup.string().required().label("Account Name"),
  phoneNumber: Yup.string().required().length(10).label("Phone Number"),
  code: Yup.string()
    .required("Enter Pin Code or request for a new code")
    .length(6)
    .label("Pin Code")
})

export const handleSubmit = async (
  { code, displayName }: TValues,
  { setSubmitting }: FormikHelpers<TValues>,
  confirmationResult: firebase.auth.ConfirmationResult
) => {
  try {
    setSubmitting(true)

    const { user } = await confirmationResult.confirm(code)
    await user.updateProfile({ displayName })

    Router.replace("/store")
  } catch (error) {
    console.log(error)
  } finally {
    setSubmitting(false)
  }
}
