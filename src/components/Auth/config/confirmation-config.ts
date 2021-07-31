import { fetcher } from "@/utils/fetcher"
import { FormikHelpers } from "formik"
import Router from "next/router"
import * as Yup from "yup"
import firebase from "@/lib/firebase"

export const initialValues = {
  code: ""
}

export type TInitialValues = typeof initialValues

export const validationSchema = Yup.object().shape({
  code: Yup.string().required().length(6).label("Pin Code")
})

export const handleSubmit = async (
  values: TInitialValues,
  actions: FormikHelpers<TInitialValues>
) => {
  try {
    const token = await fetcher<string>("/api/confirm-code", values)

    Router.replace({
      pathname: "/change-password",
      query: {
        token
      }
    })
  } catch (error) {
    console.log(error)
  } finally {
    actions.setSubmitting(false)
  }
}
