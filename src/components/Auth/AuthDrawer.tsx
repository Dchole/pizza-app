import Drawer from "@material-ui/core/Drawer"
import { useState } from "react"
import FormWrapper from "./FormWrapper"
import Register from "./Register"
import Login from "./Login"
import { useDrawerStyles } from "./styles/useDrawerStyles"

interface IAuthDrawerProps {
  open: boolean
  handleClose: () => void
}

const AuthDrawer: React.FC<IAuthDrawerProps> = ({ open, handleClose }) => {
  const classes = useDrawerStyles()
  const [view, setView] = useState<"register" | "login">("register")

  const handleChangeView = () =>
    setView(prevView => (prevView === "login" ? "register" : "login"))

  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={handleClose}
      PaperProps={{ variant: "outlined" }}
      ModalProps={{ BackdropProps: { className: classes.backdrop } }}
      classes={{ paper: classes.paper }}
    >
      <FormWrapper view={view} handleChangeView={handleChangeView}>
        {view === "register" ? <Register /> : <Login />}
      </FormWrapper>
    </Drawer>
  )
}

export default AuthDrawer
