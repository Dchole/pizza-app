import Image from "next/image"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar"
import Badge from "@material-ui/core/Badge"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import Link from "../Link"
import { navLinks } from "../Header/links"
import { useDesktopNavStyles } from "./useDesktopNavStyles"

const DesktopNavbar = () => {
  const classes = useDesktopNavStyles()

  return (
    <Toolbar component="header" className={classes.toolbar}>
      <nav className={classes.nav}>
        <Image src="/logo-placeholder.svg" alt="logo" width={35} height={58} />
        <ul className={classes.navLinks}>
          {navLinks.map(({ label, path }, index) => (
            <li key={index}>
              <Link href={path}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={classes.inline}>
        <Badge>
          <IconButton component={Link} href="/cart" aria-label="cart">
            <ShoppingCartIcon />
          </IconButton>
        </Badge>
        <IconButton aria-label="account" className={classes.avatar}>
          <Avatar />
        </IconButton>
      </div>
    </Toolbar>
  )
}

export default DesktopNavbar
