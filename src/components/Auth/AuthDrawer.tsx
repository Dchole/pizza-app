import { useRouter } from "next/router"
import { useMemo } from "react"
import Drawer from "@material-ui/core/Drawer"
import FormWrapper from "./FormWrapper"
import { useDrawerStyles } from "./styles/useDrawerStyles"
import useScreenSize from "@/hooks/usScreenSize"

export type TAuthView = "login" | "register" | null

const AuthDrawer = () => {
  const classes = useDrawerStyles()
  const desktop = useScreenSize()
  const { asPath, push, pathname } = useRouter()
  const authView = useMemo(
    () =>
      asPath.endsWith("#login") || asPath.endsWith("#register")
        ? (asPath.split("#")[1] as TAuthView)
        : null,
    [asPath]
  )

  return (
    <Drawer
      open={desktop && Boolean(authView)}
      anchor="right"
      onClose={() => push(pathname)}
      PaperProps={{ variant: "outlined" }}
      ModalProps={{ BackdropProps: { className: classes.backdrop } }}
      classes={{ paper: classes.paper }}
    >
      <FormWrapper view={authView} />
    </Drawer>
  )
}

export default AuthDrawer
