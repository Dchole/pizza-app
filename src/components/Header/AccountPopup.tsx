import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import MenuList from "@material-ui/core/MenuList"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Link from "../Link"
import { accountLinks } from "./links"

interface IAccountPopupProps {
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
}

const AccountPopup: React.FC<IAccountPopupProps> = ({
  anchorEl,
  handleClose
}) => {
  const logout = () => {
    handleClose()
  }

  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
      <MenuList>
        {accountLinks.map(({ icon, path, label }, index) => (
          // if `path` is defined, the item is link, otherwise it's a button
          <MenuItem
            key={index}
            component={path ? Link : undefined}
            href={path}
            onClick={path ? handleClose : logout}
            role={undefined}
            divider={index === 1}
            button
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default AccountPopup
