import dynamic from "next/dynamic"
import Image from "next/image"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Badge from "@material-ui/core/Badge"
import BagIcon from "@material-ui/icons/LocalMall"
import Link from "../Link"
import AvatarButton from "../AvatarButton"
import { navLinks } from "../Header/links"
import { useCart } from "../CartContext"
import { useDesktopNavStyles } from "./useDesktopNavStyles"

const AuthDrawer = dynamic(() => import("../Auth/AuthDrawer"))

const DesktopNavbar = () => {
  const classes = useDesktopNavStyles()
  const { cart } = useCart()

  return (
    <Toolbar component="header" className={classes.toolbar}>
      <nav className={classes.nav}>
        <Link href="/store">
          <Image
            src="/logo-placeholder.svg"
            alt="logo"
            width={35}
            height={58}
          />
        </Link>
        <ul className={classes.navLinks}>
          {navLinks.map(({ label, path }, index) => (
            <li key={index}>
              <Link href={path}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={classes.inline}>
        <IconButton component={Link} href="/cart" aria-label="cart">
          <Badge
            max={9}
            color="error"
            overlap="circle"
            badgeContent={cart.length}
          >
            <BagIcon />
          </Badge>
        </IconButton>
        <AvatarButton />
      </div>
      <AuthDrawer />
    </Toolbar>
  )
}

export default DesktopNavbar
