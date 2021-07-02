import Image from "next/image"
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

const Header = () => {
  const classes = useStyles()
  const scrollHeight = useRef(0)
  const [show, setShow] = useState(true)

  const handleScroll = () => {
    scrollHeight.current > window.scrollY ? setShow(true) : setShow(false)
    scrollHeight.current = window.scrollY
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Slide direction="down" in={show}>
      <AppBar variant="outlined" classes={{ root: classes.root }}>
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
              href="/account"
              role={undefined}
              naked
            >
              <AccountIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Slide>
  )
}

export default Header
