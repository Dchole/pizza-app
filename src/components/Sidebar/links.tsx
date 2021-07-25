import InfoIcon from "@material-ui/icons/Info"
import CallIcon from "@material-ui/icons/Call"
import StoreIcon from "@material-ui/icons/Store"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import WorkIcon from "@material-ui/icons/Work"
import PersonIcon from "@material-ui/icons/Person"
import ReceiptIcon from "@material-ui/icons/Receipt"

const appLinks = [
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
    label: "Cart",
    path: "/cart",
    icon: <ShoppingCartIcon />
  },
  {
    label: "Store",
    path: "/store",
    icon: <StoreIcon />
  }
]

const info = [
  {
    label: "About Us",
    path: "/about",
    icon: <InfoIcon />
  },
  {
    label: "Contact Us",
    path: "#contacts",
    icon: <CallIcon />
  }
]

const jobs = [
  {
    label: "Hiring",
    path: "/hiring",
    icon: <WorkIcon />
  }
]

export const sidebarLinks = [appLinks, info, jobs]
