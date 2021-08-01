import { useState } from "react"
import firebase from "@/lib/firebase"
import { formatMobile } from "@/utils/format-mobile"

const useAuth = (appVerifier: firebase.auth.RecaptchaVerifier) => {
  const [step, setStep] = useState(0)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [confirmationResult, setConfirmationResult] =
    useState<firebase.auth.ConfirmationResult>(null)

  const handleNextStep = async (phoneNumber: string) => {
    try {
      setLoading(true)

      const result = await firebase
        .auth()
        .signInWithPhoneNumber("+" + formatMobile(phoneNumber), appVerifier)

      setConfirmationResult(result)
      !step && setStep(step + 1)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async (phoneNumber: string) => {
    const { verifyPhoneNumber } = new firebase.auth.PhoneAuthProvider_Instance()
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
