import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useCart } from "@/components/CartContext"
import useInterval from "./useInterval"
import { formatMobile } from "@/utils/format-mobile"
import { FormikHelpers } from "formik"
import { confirmation } from "@/components/Checkout/CheckoutForm/formik-config"
import { useUser } from "@/components/UserContext"
import {
  ConfirmationResult,
  getAuth,
  linkWithPhoneNumber,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  UserCredential
} from "@firebase/auth"
import {
  addDoc,
  collection,
  getFirestore,
  Timestamp
} from "@firebase/firestore"
import { deNullify } from "@/utils/de-nullify"

const twoMinutes = 60 * 2
const useConfirmation = (name?: string, price?: number) => {
  const { user } = useUser()

  const [countDown, setCountDown] = useState(0)
  const [verifierID, setVerifierID] = useState("")
  const [accountDetails, setAccountDetails] = useState({
    displayName: user?.displayName,
    phoneNumber: user?.phoneNumber,
    location: user?.location,
    address: user?.address
  })
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "")
  const [appVerifier, setAppVerifier] = useState<RecaptchaVerifier | null>(null)

  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null)

  const [credentials, setCredentials] = useState<UserCredential | null>(null)

  const { push, query } = useRouter()
  const { cart, removeItem, clearCart, totalAmount } = useCart()

  useInterval(() => {
    if (countDown) {
      setCountDown(countDown - 1)
    }
  }, 1000)

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "checkout",
      {
        size: "invisible",
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log(response)
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
          alert("Recaptcha Expired")
        }
      },
      getAuth()
    )

    setAppVerifier(recaptchaVerifier)
  }, [])

  const sendCode = useCallback(
    async (phoneNumber: string) => {
      try {
        setPhoneNumber(phoneNumber)
        const result = await signInWithPhoneNumber(
          getAuth(),
          "+" + formatMobile(phoneNumber),
          deNullify(appVerifier)
        )

        setCountDown(twoMinutes)
        setConfirmationResult(result)
      } catch (error) {}
    },
    [appVerifier]
  )

  const handleResend = async () => {
    const { verifyPhoneNumber } = new PhoneAuthProvider(getAuth())
    const verifierID = await verifyPhoneNumber(
      "+" + formatMobile(phoneNumber),
      deNullify(appVerifier)
    )

    setVerifierID(verifierID)
    setCountDown(twoMinutes)
  }

  const confirmCode = async (code: string) => {
    const confirmation = deNullify(confirmationResult)
    await confirmation.confirm(code)
    const user = getAuth().currentUser

    if (!user) return

    if (user.providerData[0].providerId !== "phone") {
      linkWithPhoneNumber(user, user.phoneNumber || "", deNullify(appVerifier))
    }
  }

  const handleComplete = async <ValuesType extends typeof confirmation>(
    values: ValuesType,
    actions: FormikHelpers<ValuesType>
  ) => {
    try {
      await confirmCode(values.code)

      const item = cart.find(pizza => pizza.slug === query.slug)
      item && removeItem(item.id)

      let products = [name]
      let amount = 0

      if (!query.slug) {
        amount = totalAmount
        if (cart.length) products = cart.map(item => item.name)

        await clearCart()
      }

      const user = getAuth().currentUser

      addDoc(collection(getFirestore(), `users/${user?.uid}/transactions`), {
        products,
        amount: price ?? amount,
        date: Timestamp.fromDate(new Date())
      })

      push("/store")
    } catch (error: any) {
      console.log(error.message)
    } finally {
      actions.setSubmitting(false)
    }
  }

  const handleDetails = (values: typeof accountDetails) => {
    setAccountDetails(prevDetails => ({ ...prevDetails, ...values }))
  }

  return {
    sendCode,
    countDown,
    confirmCode,
    handleResend,
    handleDetails,
    accountDetails,
    handleComplete
  }
}

export default useConfirmation
