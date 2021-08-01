import { FormikHelpers } from "formik"
import firebase from "@/lib/firebase"
import * as Yup from "yup"
import Router from "next/router"

export const initialValues = {
  phoneNumber: "",
  code: ""
}

export type TValues = typeof initialValues

export const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string().required().length(10).label("Phone Number"),
  code: Yup.string()
    .required("Enter Pin Code or request for a new code")
    .length(6)
    .label("Pin Code")
})

export const handleSubmit = async (
  { code }: TValues,
  { setSubmitting }: FormikHelpers<TValues>,
  confirmationResult: firebase.auth.ConfirmationResult
) => {
  const { pathname, replace } = Router

  try {
    setSubmitting(true)
    await confirmationResult.confirm(code)

    replace(pathname === "/" ? "/store" : window.location.pathname)
  } catch (error) {
    console.log(error)
  } finally {
    setSubmitting(false)
  }
}
