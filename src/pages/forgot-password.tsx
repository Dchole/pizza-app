import {
  findAccount,
  findAccountSchema,
  findAccountValues
} from "@/components/Auth/config/forgot_password-config"
import ForgotPassword from "@/components/Auth/ForgotPassword"

const FindAccount = () => {
  return (
    <ForgotPassword
      heading="Find Your Account"
      description="Find your account by phone number and get verified to change password"
      initialValues={findAccountValues}
      validationSchema={findAccountSchema}
      handleSubmit={findAccount}
      inputProps={{
        id: "find-account-input",
        name: "phoneNumber",
        type: "tel",
        label: "Phone Number",
        autoComplete: "tel"
      }}
    />
  )
}

export default FindAccount
