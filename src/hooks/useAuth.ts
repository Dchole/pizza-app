import { useState } from "react"
import { formatMobile } from "@/utils/format-mobile"
import {
  ConfirmationResult,
  getAuth,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "@firebase/auth"

const useAuth = (appVerifier: RecaptchaVerifier) => {
  const [step, setStep] = useState(0)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult>(null)

  const handleNextStep = async (phoneNumber: string) => {
    try {
      setLoading(true)

      const result = await signInWithPhoneNumber(
        getAuth(),
        "+" + formatMobile(phoneNumber),
        appVerifier
      )

      setConfirmationResult(result)
      !step && setStep(step + 1)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async (phoneNumber: string) => {
    const { verifyPhoneNumber } = new PhoneAuthProvider(getAuth())
    verifyPhoneNumber("+" + formatMobile(phoneNumber), appVerifier)
  }

  const clearError = () => setError("")

  return {
    step,
    error,
    loading,
    confirmationResult,
    handleNextStep,
    handleResend,
    clearError
  }
}

export default useAuth
