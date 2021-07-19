import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Slide from "@material-ui/core/Slide"
import BagIcon from "@material-ui/icons/LocalMall"
import MenuIcon from "@material-ui/icons/Menu"
import Link from "@/components/Link"
import useScreenSize from "@/hooks/usScreenSize"
import { useStyles } from "./useStyles"
import { navLinks } from "./links"
import AvatarButton from "../AvatarButton"

const AuthDrawer = dynamic(() => import("@/components/Auth/AuthDrawer"))
const Sidebar = dynamic(() => import("@/components/Sidebar"))

const Header = () => {
  const desktop = useScreenSize()
  const classes = useStyles()
  const scrollHeight = useRef(0)
  const headerRef = useRef<HTMLElement>(null)
  const [show, setShow] = useState(true)
  const [open, setOpen] = useState(false)
  const [scrollDown, setScrollDown] = useState(false)

  const handleScroll = () => {
    window.scrollY > 200 ? setScrollDown(true) : setScrollDown(false)

    scrollHeight.current > window.scrollY ? setShow(true) : setShow(false)
    scrollHeight.current = window.scrollY
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Slide direction="down" in={show}>
      <AppBar
        ref={headerRef}
        variant="outlined"
        classes={{
          root: scrollDown ? classes.root : clsx(classes.root, classes.top)
        }}
      >
        <Toolbar>
          <div className={classes.nav}>
            <IconButton
              onClick={handleOpen}
              className={scrollDown ? undefined : classes.iconButton}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.logo}>
              <Image
                src="/logo-placeholder.svg"
                alt="logo"
                width={desktop ? 40 : 35}
                height={desktop ? 65 : 58}
              />
            </div>
            <nav hidden={!desktop}>
              <ul id="navigation">
                {navLinks.map(({ label, path }) => (
                  <li key={label}>
                    <Link href={path}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className={classes.account}>
            <IconButton
              aria-label="cart"
              component={Link}
              href="/cart"
              role={undefined}
              naked
            >
              <BagIcon />
            </IconButton>
            <AvatarButton className={classes.avatar} />
          </div>
          <Sidebar open={open} handleClose={handleClose} />
          <AuthDrawer />
        </Toolbar>
      </AppBar>
    </Slide>
  )
}

export default Header
