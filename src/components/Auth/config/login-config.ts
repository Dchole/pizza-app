import { FormikHelpers } from "formik"
import * as Yup from "yup"

export const initialValues = {
  phoneNumber: "",
  password: ""
}

export type TValues = typeof initialValues

export const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string().required().label("Phone Number"),
  password: Yup.string().min(8).required().label("Password")
})

export const handleSubmit = (
  values: TValues,
  actions: FormikHelpers<TValues>
) => {
  console.log(values, actions)
}
