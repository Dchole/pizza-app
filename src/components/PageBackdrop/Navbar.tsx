import { useEffect, useState } from "react"
import clsx from "clsx"
import Image from "next/image"
import Toolbar from "@material-ui/core/Toolbar"
import Grid from "@material-ui/core/Grid"
import Zoom from "@material-ui/core/Zoom"
import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar"
import Badge from "@material-ui/core/Badge"
import InputBase from "@material-ui/core/InputBase"
import MenuIcon from "@material-ui/icons/Menu"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import SearchIcon from "@material-ui/icons/Search"
import CloseIcon from "@material-ui/icons/Close"
import Link from "../Link"
import { useStyles } from "./useStyles"
import { navLinks } from "../Header/links"

interface INavbarProps {
  open: boolean
  handleClose: () => void
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Navbar: React.FC<INavbarProps> = ({ open, handleOpen, handleClose }) => {
  const classes = useStyles()
  const [navElTransition, setNavElTransition] = useState(false)
  const [closeBtnTransition, setCloseBtnTransition] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (open) {
      timeout = setTimeout(() => setNavElTransition(open), 150)
      setCloseBtnTransition(open)
    } else {
      timeout = setTimeout(() => setCloseBtnTransition(open), 150)
      setNavElTransition(open)
    }

    return () => clearTimeout(timeout)
  }, [open])

  return (
    <Toolbar component="header" className={classes.toolbar}>
      <Grid alignItems="center" container>
        <Zoom in={!closeBtnTransition} timeout={150} unmountOnExit mountOnEnter>
          <IconButton
            data-direction="left"
            aria-label="open navigation menu"
            onClick={handleOpen}
            className={classes.hideIconBtn}
          >
            <MenuIcon />
          </IconButton>
        </Zoom>
        <Zoom in={!closeBtnTransition} timeout={150} unmountOnExit mountOnEnter>
          <div>
            <Image
              src="/logo-placeholder.svg"
              alt="logo"
              width={35}
              height={58}
            />
          </div>
        </Zoom>
        <nav className={clsx(classes.hideOnLarge, classes.nav)}>
          <ul className={classes.navLinks}>
            {navLinks.map(({ label, path }, index) => (
              <li key={index}>
                <Link href={path}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Grid>
      <Zoom in={!closeBtnTransition} timeout={150} unmountOnExit mountOnEnter>
        <IconButton
          data-direction="right"
          aria-label="open search and filter options"
          onClick={handleOpen}
          className={classes.hideIconBtn}
        >
          <SearchIcon />
        </IconButton>
      </Zoom>
      <Zoom unmountOnExit mountOnEnter in={navElTransition} timeout={150}>
        <IconButton aria-label="close menu" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Zoom>
      <InputBase
        placeholder="Search"
        className={clsx(classes.hideOnLarge, classes.inputBase)}
      />
      <div className={classes.inline}>
        <Badge>
          <IconButton
            component={Link}
            href="/cart"
            aria-label="cart"
            className={classes.hideOnLarge}
          >
            <ShoppingCartIcon />
          </IconButton>
        </Badge>
        <IconButton
          aria-label="account"
          className={clsx(classes.hideOnLarge, classes.avatar)}
        >
          <Avatar />
        </IconButton>
      </div>
    </Toolbar>
  )
}

export default Navbar
