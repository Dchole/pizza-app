import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Link from "../Link"
import { accountLinks } from "./links"
import { useCart } from "../CartContext"
import { useRouter } from "next/router"
import { getAuth } from "@firebase/auth"

interface IAccountPopupProps {
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
}

const AccountPopup: React.FC<IAccountPopupProps> = ({
  anchorEl,
  handleClose
}) => {
  const { replace, pathname } = useRouter()
  const { clearCart } = useCart()

  const logout = async () => {
    await getAuth().signOut()

    clearCart()
    handleClose()
    replace(pathname === "/" ? "/" : "/store")
  }

  return (
    <>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
        {accountLinks.map(({ icon, path, label }, index) => (
          // if `path` is defined, the item is link, otherwise it's a button
          <MenuItem
            key={index}
            component={Link}
            href={path}
            onClick={label === "Logout" ? logout : handleClose}
            divider={index === 1}
            button
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default AccountPopup
