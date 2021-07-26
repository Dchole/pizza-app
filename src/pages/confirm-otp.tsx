import {
  confirmValues,
  confirmSchema,
  confirmOTP
} from "@/components/Auth/config/forgot_password-config"
import ForgotPassword from "@/components/Auth/ForgotPassword"

const ConfirmOtp = () => {
  return (
    <ForgotPassword
      heading="Confirm Pin Code"
      description="Enter the pin code sent you via SMS to verify account"
      initialValues={confirmValues}
      validationSchema={confirmSchema}
      handleSubmit={confirmOTP}
      inputProps={{
        id: "otp-input",
        name: "code",
        label: "Pin Code",
        autoComplete: "off"
      }}
    />
  )
}

export default ConfirmOtp
