import Image from "next/image"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar"
import Badge from "@material-ui/core/Badge"
import BagIcon from "@material-ui/icons/LocalMall"
import AccountPopup from "../Header/AccountPopup"
import Link from "../Link"
import { navLinks } from "../Header/links"
import { useCart } from "../CartContext"
import { useState } from "react"
import { useDesktopNavStyles } from "./useDesktopNavStyles"

const DesktopNavbar = () => {
  const classes = useDesktopNavStyles()
  const { cart } = useCart()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

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
        <IconButton
          aria-label="account"
          className={classes.avatar}
          onClick={handleOpen}
        >
          <Avatar />
        </IconButton>
      </div>
      <AccountPopup anchorEl={anchorEl} handleClose={handleClose} />
    </Toolbar>
  )
}

export default DesktopNavbar
