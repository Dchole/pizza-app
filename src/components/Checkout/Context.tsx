import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react"
import firebase from "@/lib/firebase"
import useInterval from "@/hooks/useInterval"
import { useRouter } from "next/router"
import { useCart } from "../CartContext"
import { formatMobile } from "@/utils/format-mobile"
import { TValues } from "./CheckoutForm/formik-config"
import { FormikHelpers } from "formik"

interface IContext {
  countDown: number
  sendCode: (phoneNumber: string) => Promise<void>
  handleResend: (phoneNumber: string) => Promise<void>
  handleComplete: (
    values: Partial<TValues>,
    actions: FormikHelpers<Partial<TValues>>
  ) => Promise<void>
}

const Context = createContext({} as IContext)
const twoMinutes = 60 * 2

const ConfirmationProvider: React.FC<{ name?: string; price?: number }> = ({
  children,
  name,
  price
}) => {
  const [countDown, setCountDown] = useState(0)

  const [appVerifier, setAppVerifier] =
    useState<firebase.auth.RecaptchaVerifier>(null)

  const [confirmationResult, setConfirmationResult] =
    useState<firebase.auth.ConfirmationResult>(null)

  const { push, query } = useRouter()
  const { cart, removeItem, clearCart, totalAmount } = useCart()

  useInterval(() => {
    if (countDown) {
      setCountDown(countDown - 1)
    }
  }, 1000)

  useEffect(() => {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier("checkout", {
      size: "invisible",
      callback: response => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log(response)
      },
      "expired-callback": () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
        console.log("Recaptcha Expired")
      }
    })

    setAppVerifier(recaptchaVerifier)
  }, [])

  const sendCode = useCallback(
    async (phoneNumber: string) => {
      try {
        const result = await firebase
          .auth()
          .signInWithPhoneNumber("+" + formatMobile(phoneNumber), appVerifier)

        setCountDown(twoMinutes)
        setConfirmationResult(result)
      } catch (error) {}
    },
    [appVerifier]
  )

  const handleResend = async (phoneNumber: string) => {
    const { verifyPhoneNumber } = new firebase.auth.PhoneAuthProvider_Instance()
    verifyPhoneNumber("+" + formatMobile(phoneNumber), appVerifier)
    setCountDown(twoMinutes)
  }

  const handleComplete = async (
    values: Partial<TValues>,
    actions: FormikHelpers<Partial<TValues>>
  ) => {
    try {
      await confirmationResult.confirm(values.code)

      const item = cart.find(pizza => pizza.slug === query.slug)
      item && removeItem(item.id)

      let products = [name]
      let amount = 0

      if (!query.slug) {
        amount = totalAmount
        if (cart.length) products = cart.map(item => item.name)

        await clearCart()
      }

      const user = firebase.auth().currentUser

      firebase
        .firestore()
        .collection(`users/${user?.uid}/transactions`)
        .add({
          products,
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

  return (
    <Context.Provider
      value={{
        countDown,
        sendCode,
        handleResend,
        handleComplete
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useConfirmation = () => {
  const confirmContext = useContext(Context)

  if (!confirmContext) {
    throw new Error("useConfirmation was used outside ConfirmationProvider")
  }

  return confirmContext
}

export default ConfirmationProvider
