import Drawer from "@material-ui/core/Drawer"
import Login from "./Login"
import Register from "./Register"
import Link from "../Link"
import { useStyles } from "./useStyles"

interface IAuthDrawerProps {
  open: boolean
  handleClose: () => void
}

const AuthDrawer: React.FC<IAuthDrawerProps> = ({ open, handleClose }) => {
  const classes = useStyles()

  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={handleClose}
      classes={{ paper: classes.paper }}
    >
      <Register />
      <Link href="#"></Link>
    </Drawer>
  )
}

export default AuthDrawer
