import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar"
import Slide from "@material-ui/core/Slide"
import BagIcon from "@material-ui/icons/LocalMall"
import MenuIcon from "@material-ui/icons/Menu"
import Link from "@/components/Link"
import useUser from "@/hooks/useUser"
import useScreenSize from "@/hooks/usScreenSize"
import { useStyles } from "./useStyles"
import { navLinks } from "./links"

const AuthDrawer = dynamic(() => import("@/components/Auth/AuthDrawer"))
const Sidebar = dynamic(() => import("@/components/Sidebar"))
const AccountPopup = dynamic(() => import("./AccountPopup"))

const Header = () => {
  const { user } = useUser()
  const mobile = useScreenSize()
  const classes = useStyles()
  const scrollHeight = useRef(0)
  const headerRef = useRef<HTMLElement>(null)
  const [show, setShow] = useState(true)
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [scrollDown, setScrollDown] = useState(false)

  const handleScroll = () => {
    window.scrollY > 200 ? setScrollDown(true) : setScrollDown(false)

    scrollHeight.current > window.scrollY ? setShow(true) : setShow(false)
    scrollHeight.current = window.scrollY
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const setAnchor = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const clearAnchor = () => setAnchorEl(null)

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
            <IconButton onClick={handleOpen}>
              <MenuIcon />
            </IconButton>
            <div className={classes.logo}>
              <Image
                src="/logo-placeholder.svg"
                alt="logo"
                width={mobile ? 35 : 40}
                height={mobile ? 58 : 65}
              />
            </div>
            <nav hidden={mobile}>
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
            {user?.isLoggedIn ? (
              <IconButton
                aria-label="open menu"
                className={classes.avatar}
                onClick={setAnchor}
              >
                <Avatar />
              </IconButton>
            ) : (
              <IconButton
                aria-label="sign up"
                component={Link}
                href={mobile ? "/register" : "#register"}
                role={undefined}
                className={classes.avatar}
                naked
              >
                <Avatar />
              </IconButton>
            )}
          </div>
          <Sidebar open={open} handleClose={handleClose} />
          <AccountPopup anchorEl={anchorEl} handleClose={clearAnchor} />
          <AuthDrawer />
        </Toolbar>
      </AppBar>
    </Slide>
  )
}

export default Header
