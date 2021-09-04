import { useCallback, useState } from "react"
import { formatMobile } from "@/utils/format-mobile"
import { useRouter } from "next/router"
import { usePizzaContext } from "@/components/PizzaContext"
import { useCart } from "@/components/CartContext"
import { FormikHelpers } from "formik"
import { TValues } from "./formik-config"
import useInterval from "@/hooks/useInterval"
import firebase from "@/lib/firebase"
import { usePrice } from "pages/checkout/[slug]"

const twoMintutes = 60 * 2

const useConfirmation = (appVerifier?: firebase.auth.RecaptchaVerifier) => {
  const [error, setError] = useState("")
  const price = usePrice()
  const [countDown, setCountDown] = useState(0)
  const [confirmationResult, setConfirmationResult] =
    useState<firebase.auth.ConfirmationResult>(null)

  const { push, query } = useRouter()
  const { allPizzas } = usePizzaContext()
  const { cart, removeItem, clearCart, totalAmount } = useCart()

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

      const productList = [item.name]
      let amount = 0

      if (!query.slug) {
        amount = totalAmount
        cart.length && cart.forEach(item => productList.push(item.name))

        await clearCart()
      }

      const user = firebase.auth().currentUser

      firebase
        .firestore()
        .collection(`users/${user?.uid}/transactions`)
        .add({
          products: productList,
          amount: price ?? amount,
          date: firebase.firestore.Timestamp.fromDate(new Date())
        })

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
