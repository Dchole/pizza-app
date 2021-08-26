import * as Yup from "yup"
import { FormikHelpers } from "formik"

export const personalDetails = {
  displayName: "",
  phoneNumber: "",
  location: "",
  address: ""
}

export const paymentDetails = {
  paymentMethod: "cash"
}

export const confirmation = {
  code: ""
}

export const initialValues = {
  ...personalDetails,
  ...paymentDetails,
  ...confirmation
}

export type TValues = typeof initialValues

export const validationSchema = Yup.object().shape({
  displayName: Yup.string().required().label("Full Name"),
  phoneNumber: Yup.string().required().length(10).label("Phone Number"),
  location: Yup.string()
    .required("City or Town is required")
    .label("City or Town"),
  address: Yup.string()
    .required("Please enter your Home Address or Street Name")
    .label("Home Address or Street Name"),
  paymentMethod: Yup.string()
    .required("Please select payment method")
    .label("Payment Method"),
  code: Yup.string().required().label("Pin Code")
})

export const mobileValidationSchema = Yup.object().shape({
  displayName: Yup.string().required().label("Full Name"),
  phoneNumber: Yup.string().required().length(10).label("Phone Number"),
  location: Yup.string()
    .required("City or Town is required")
    .label("City or Town"),
  address: Yup.string()
    .required("Please enter your Home Address or Street Name")
    .label("Home Address or Street Name"),
  paymentMethod: Yup.string()
    .required("Please select payment method")
    .label("Payment Method")
})

export const handleSubmit = async (
  values: TValues,
  actions: FormikHelpers<TValues>
) => {
  console.log(values, actions)
  try {
    const req = await Promise.resolve(42)
  } catch (error) {
    console.log(error.message)
  } finally {
    actions.setSubmitting(false)
  }
}
