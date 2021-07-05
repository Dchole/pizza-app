import PersonIcon from "@material-ui/icons/Person"
import AccountIcon from "@material-ui/icons/AccountBox"
import LogoutIcon from "@material-ui/icons/ExitToApp"

export const navLinks = [
  {
    label: "About Us",
    path: "/about"
  },
  {
    label: "Contact Us",
    path: "#contacts"
  },
  {
    label: "Store",
    path: "/store"
  }
]

export const accountLinks = [
  {
    label: "Profile",
    path: "/profile",
    icon: <PersonIcon />
  },
  {
    label: "Account Setting",
    path: "/account",
    icon: <AccountIcon />
  },
  {
    label: "Logout",
    path: undefined,
    icon: <LogoutIcon />
  }
]
