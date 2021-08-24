import * as Yup from "yup"
import { FormikHelpers } from "formik"

export const initialValues = {
  displayName: "",
  phoneNumber: "",
  location: "",
  address: ""
}

export const confirmation = {
  code: ""
}

export type TValues = typeof initialValues
export type TConfirm = typeof confirmation

export const personalDetailsSchema = Yup.object().shape({
  displayName: Yup.string().required().label("Full Name"),
  phoneNumber: Yup.string().required().length(10).label("Phone Number"),
  location: Yup.string()
    .required("City or Town is required")
    .label("City or Town"),
  address: Yup.string()
    .required("Please enter your Home Address or Street Name")
    .label("Home Address or Street Name")
})

export const handleDetails =
  (nextStep: () => void) =>
  async (values: TValues, actions: FormikHelpers<TValues>) => {
    console.log(values, actions)
    try {
      const req = await Promise.resolve(42)
      nextStep()
    } catch (error) {
      console.log(error.message)
    } finally {
      actions.setSubmitting(false)
    }
  }

export const confirm = (values: TValues, actions: FormikHelpers<TValues>) => {
  console.log(values, actions)
}
