import InfoIcon from "@material-ui/icons/Info"
import CallIcon from "@material-ui/icons/Call"
import StoreIcon from "@material-ui/icons/Store"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import WorkIcon from "@material-ui/icons/Work"
import AccountIcon from "@material-ui/icons/AccountBox"
import HistoryIcon from "@material-ui/icons/History"

const appLinks = [
  {
    label: "Account",
    path: "/account",
    icon: <AccountIcon />
  },
  {
    label: "History",
    path: "/transactions",
    icon: <HistoryIcon />
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
    label: "Career",
    path: "/career",
    icon: <WorkIcon />
  }
]

export const sidebarLinks = [appLinks, info, jobs]
