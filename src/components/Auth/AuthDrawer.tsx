import Drawer from "@material-ui/core/Drawer"
import FormWrapper from "./FormWrapper"
import Register from "./Register"
import Login from "./Login"
import { useDrawerStyles } from "./styles/useDrawerStyles"
import { TAuthView } from "../Header"

interface IAuthDrawerProps {
  view: TAuthView
  handleClose: () => void
}

const AuthDrawer: React.FC<IAuthDrawerProps> = ({ view, handleClose }) => {
  const classes = useDrawerStyles()

  return (
    <Drawer
      open={Boolean(view)}
      anchor="right"
      onClose={handleClose}
      PaperProps={{ variant: "outlined" }}
      ModalProps={{ BackdropProps: { className: classes.backdrop } }}
      classes={{ paper: classes.paper }}
    >
      <FormWrapper view={view}>
        {view === "register" ? <Register /> : <Login />}
      </FormWrapper>
    </Drawer>
  )
}

export default AuthDrawer
