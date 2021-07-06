import FormWrapper from "@/components/Auth/FormWrapper"
import { usePageStyles } from "@/components/Auth/styles/usePageStyles"

const Login = () => {
  const classes = usePageStyles()

  return (
    <main className={classes.root}>
      <FormWrapper />
    </main>
  )
}

export default Login
