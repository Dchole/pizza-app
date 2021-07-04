import clsx from "clsx"
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

const AuthDrawer = dynamic(() => import("@/components/Auth/AuthDrawer"))

const Header = () => {
  const classes = useStyles()
  const scrollHeight = useRef(0)
  const headerRef = useRef<HTMLElement>(null)
  const [show, setShow] = useState(true)
  const [open, setOpen] = useState(false)
  const [scrollDown, setScrollDown] = useState(false)

  const closeDrawer = () => setOpen(false)

  const handleScroll = () => {
    window.scrollY > 200 ? setScrollDown(true) : setScrollDown(false)

    scrollHeight.current > window.scrollY ? setShow(true) : setShow(false)
    scrollHeight.current = window.scrollY
  }

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
              href="#auth"
              role={undefined}
              onClick={() => setOpen(true)}
              naked
            >
              <AccountIcon />
            </IconButton>
          </div>
          <AuthDrawer open={open} handleClose={closeDrawer} />
        </Toolbar>
      </AppBar>
    </Slide>
  )
}

export default Header
