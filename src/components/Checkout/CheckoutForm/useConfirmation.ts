import { useCallback, useState } from "react"
import { formatMobile } from "@/utils/format-mobile"
import useInterval from "@/hooks/useInterval"
import firebase from "@/lib/firebase"
import { useRouter } from "next/router"
import { usePizzaContext } from "@/components/PizzaContext"
import { useCart } from "@/components/CartContext"
import { FormikHelpers } from "formik"
import { TValues } from "./formik-config"

const twoMintutes = 60 * 2

const useConfirmation = (appVerifier?: firebase.auth.RecaptchaVerifier) => {
  const [error, setError] = useState("")
  const [countDown, setCountDown] = useState(0)
  const [confirmationResult, setConfirmationResult] =
    useState<firebase.auth.ConfirmationResult>(null)

  const { push, query } = useRouter()
  const { allPizzas } = usePizzaContext()
  const { removeItem } = useCart()

  useInterval(() => {
    if (countDown) {
      setCountDown(countDown - 1)
    }
  }, 1000)

  const sendCode = useCallback(
    async (phoneNumber: string) => {
      try {
        const result = await firebase
          .auth()
          .signInWithPhoneNumber("+" + formatMobile(phoneNumber), appVerifier)

        setCountDown(twoMintutes)
        setConfirmationResult(result)
      } catch (error) {
        setError(error.message)
      }
    },
    [appVerifier]
  )

  const handleResend = async (phoneNumber: string) => {
    const { verifyPhoneNumber } = new firebase.auth.PhoneAuthProvider_Instance()
    verifyPhoneNumber("+" + formatMobile(phoneNumber), appVerifier)
    setCountDown(twoMintutes)
  }

  const handleComplete = async (
    values: Partial<TValues>,
    actions: FormikHelpers<Partial<TValues>>
  ) => {
    try {
      await confirmationResult.confirm(values.code)
      const item = allPizzas.find(pizza => pizza.slug === query.slug)
      item && removeItem(item.id)

      push("/store")
    } catch (error) {
      console.log(error.message)
    } finally {
      actions.setSubmitting(false)
    }
  }

  const clearError = () => setError("")

  return {
    error,
    sendCode,
    clearError,
    handleResend,
    handleComplete,
    confirmationResult
  }
}

export default useConfirmation
