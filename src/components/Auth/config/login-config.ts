import { FormikHelpers } from "formik"
import * as Yup from "yup"
import Router from "next/router"
import { ConfirmationResult } from "@firebase/auth"
import { deNullify } from "@/utils/de-nullify"

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
  confirmationResult: ConfirmationResult | null
) => {
  const { pathname, replace } = Router

  try {
    setSubmitting(true)
    const confirmation = deNullify(confirmationResult)
    await confirmation.confirm(code)

    replace(pathname === "/" ? "/store" : window.location.pathname)
  } catch (error) {
    console.log(error)
  } finally {
    setSubmitting(false)
  }
}
