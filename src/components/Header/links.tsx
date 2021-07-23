import PersonIcon from "@material-ui/icons/Person"
import ReceiptIcon from "@material-ui/icons/Receipt"
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
    label: "Transactions",
    path: "/history",
    icon: <ReceiptIcon />
  },
  {
    label: "Logout",
    path: "#logout",
    icon: <LogoutIcon />
  }
]
