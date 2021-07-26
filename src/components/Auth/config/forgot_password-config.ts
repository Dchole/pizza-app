import { fetcher } from "@/utils/fetcher"
import { FormikHelpers } from "formik"
import Router from "next/router"
import * as Yup from "yup"

export const findAccountValues = {
  phoneNumber: ""
}

export const confirmValues = {
  code: ""
}

export type TFindAccountValues = typeof findAccountValues
export type TConfirmValues = typeof confirmValues

export const findAccountSchema = Yup.object().shape({
  phoneNumber: Yup.string().required().label("Phone Number")
})

export const confirmSchema = Yup.object().shape({
  code: Yup.string().required().length(4).label("Pin Code")
})

export type TSchema = typeof confirmSchema | typeof findAccountSchema

export const findAccount = async (
  values: TFindAccountValues,
  actions: FormikHelpers<TFindAccountValues>
) => {
  try {
    const response = await fetcher("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    })

    Router.push("/confirm-otp")
  } catch (error) {
    console.log(error)
  } finally {
    actions.setSubmitting(false)
  }
}

export const confirmOTP = async (
  values: TConfirmValues,
  actions: FormikHelpers<TConfirmValues>
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
