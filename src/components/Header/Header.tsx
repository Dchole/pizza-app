import clsx from "clsx"
import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Image from "next/image"
import dynamic from "next/dynamic"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Slide from "@material-ui/core/Slide"
import BagIcon from "@material-ui/icons/LocalMall"
import AccountIcon from "@material-ui/icons/AccountCircle"
import Link from "@/components/Link"
import { useStyles } from "./useStyles"
import { navLinks } from "./nav-links"
import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"

const AuthDrawer = dynamic(() => import("@/components/Auth/AuthDrawer"))

export type TAuthView = "login" | "register" | null

const Header = () => {
  const classes = useStyles()
  const router = useRouter()
  const scrollHeight = useRef(0)
  const headerRef = useRef<HTMLElement>(null)
  const [show, setShow] = useState(true)
  const [scrollDown, setScrollDown] = useState(false)
  const [authView, setAuthView] = useState<TAuthView>(
    router.asPath.substring(2) as TAuthView
  )
  const { breakpoints } = useTheme()
  const mobile = useMediaQuery(breakpoints.down("xs"))

  const closeDrawer = () => router.push("/")

  const handleScroll = () => {
    window.scrollY > 200 ? setScrollDown(true) : setScrollDown(false)

    scrollHeight.current > window.scrollY ? setShow(true) : setShow(false)
    scrollHeight.current = window.scrollY
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    let view = router.asPath.substring(2) as TAuthView
    setAuthView(view)
  }, [router.asPath])

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
            <div className={classes.logo}>
              <Image
                src="/logo-placeholder.svg"
                alt="logo"
                width={40}
                height={65}
              />
            </div>
            <nav>
              <ul>
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
            <IconButton
              aria-label="account"
              component={Link}
              href={mobile ? "/register" : "#register"}
              role={undefined}
              naked
            >
              <AccountIcon />
            </IconButton>
          </div>
          <AuthDrawer view={authView} handleClose={closeDrawer} />
        </Toolbar>
      </AppBar>
    </Slide>
  )
}

export default Header
