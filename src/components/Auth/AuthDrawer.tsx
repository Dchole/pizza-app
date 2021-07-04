import { useRouter } from "next/router"
import { useMemo } from "react"
import Drawer from "@material-ui/core/Drawer"
import FormWrapper from "./FormWrapper"
import Register from "./Register"
import Login from "./Login"
import { useDrawerStyles } from "./styles/useDrawerStyles"

export type TAuthView = "login" | "register" | null

const AuthDrawer = () => {
  const classes = useDrawerStyles()
  const { asPath, push } = useRouter()
  const authView = useMemo(
    () =>
      ["login", "register"].includes(asPath.substring(2))
        ? (asPath.substring(2) as TAuthView)
        : null,
    [asPath]
  )

  return (
    <Drawer
      open={Boolean(authView)}
      anchor="right"
      onClose={() => push("/")}
      PaperProps={{ variant: "outlined" }}
      ModalProps={{ BackdropProps: { className: classes.backdrop } }}
      classes={{ paper: classes.paper }}
    >
      <FormWrapper view={authView}>
        {authView === "register" ? <Register /> : <Login />}
      </FormWrapper>
    </Drawer>
  )
}

export default AuthDrawer
