import Drawer from "@material-ui/core/Drawer"
import Login from "./Login"
import Register from "./Register"
import Link from "../Link"

interface IAuthDrawerProps {
  open: boolean
  handleClose: () => void
}

const AuthDrawer: React.FC<IAuthDrawerProps> = ({ open, handleClose }) => {
  return (
    <Drawer open={open} anchor="right" onClose={handleClose}>
      <Register />
      <Link href="#"></Link>
    </Drawer>
  )
}

export default AuthDrawer
