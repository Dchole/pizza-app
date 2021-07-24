import Script from "next/script"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import MenuList from "@material-ui/core/MenuList"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Link from "../Link"
import useUser from "@/hooks/useUser"
import { fetcher } from "@/utils/fetcher"
import { accountLinks } from "./links"
import { init } from "@/lib/google-auth"
import { useCart } from "../CartContext"
import { useRouter } from "next/router"

interface IAccountPopupProps {
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
}

const AccountPopup: React.FC<IAccountPopupProps> = ({
  anchorEl,
  handleClose
}) => {
  const { replace } = useRouter()
  const { user, mutate } = useUser()
  const { clearCart } = useCart()

  const logout = async () => {
    if (user?.authMethod === "google") {
      const GoogleAuth = gapi.auth2.getAuthInstance()
      GoogleAuth.signOut()
    }

    await fetcher("/api/logout")
    mutate()
    clearCart()
    handleClose()
    replace("/store")
  }

  return (
    <>
      <Script
        src="https://apis.google.com/js/api.js"
        onLoad={() => gapi.load("client", init)}
      ></Script>
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
