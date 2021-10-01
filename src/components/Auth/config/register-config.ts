import { FormikHelpers } from "formik"
import * as Yup from "yup"
import Router from "next/router"
import { ConfirmationResult, updateProfile } from "@firebase/auth"
import { deNullify } from "@/utils/de-nullify"

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
  confirmationResult: ConfirmationResult | null
) => {
  const { pathname, replace } = Router

  try {
    setSubmitting(true)

    const confirmation = deNullify(confirmationResult)
    const { user } = await confirmation.confirm(code)

    await updateProfile(user, { displayName })

    replace(pathname === "/" ? "/store" : window.location.pathname)
  } catch (error) {
    console.log(error)
  } finally {
    setSubmitting(false)
  }
}
