import "@fontsource/montserrat/500.css"

import { useRouter } from "next/router"
import { useState, useCallback } from "react"
import clsx from "clsx"
import dynamic from "next/dynamic"
import Paper from "@material-ui/core/Paper"
import Slide from "@material-ui/core/Slide"
import Badge from "@material-ui/core/Badge"
import IconButton from "@material-ui/core/IconButton"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import MobileNavbar from "./MobileNavbar"
import Link from "../Link"
import useScreenSize from "@/hooks/usScreenSize"
import { useStyles } from "./useStyles"
import { useCart } from "../CartContext"

const DesktopNavbar = dynamic(() => import("./DesktopNavbar"))
const SideNav = dynamic(() => import("./SideNav"))
const Filter = dynamic(() => import("./Filter"))

type TDirection = "left" | "right" | "up"

const PageBackdrop: React.FC = ({ children }) => {
  const { pathname } = useRouter()
  const classes = useStyles()
  const [direction, setDirection] = useState<TDirection>("up")
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)
  const mobile = useScreenSize()
  const { cart } = useCart()

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true)
    setShow(true)

    const { direction } = event.currentTarget.dataset
    setDirection(direction as TDirection)
  }

  const handleHide = () => setShow(false)

  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <div className={classes.root}>
      {mobile ? (
        <MobileNavbar
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      ) : (
        <DesktopNavbar />
      )}
      <Slide direction={direction} in={!open} onEntered={handleHide}>
        <Paper className={classes.paper}>{children}</Paper>
      </Slide>
      {show && direction === "left" && (
        <div className={clsx(classes.aside, classes.sidenav)}>
          <SideNav />
        </div>
      )}
      {show && direction === "right" && (
        <div className={clsx(classes.aside, classes.filter)}>
          <Filter
            showing={direction === "right" && open}
            handleClose={handleClose}
          />
        </div>
      )}
      {pathname !== "/cart" && (
        <Slide direction="left" in={!open}>
          <div className={clsx(classes.hideOnLarge, classes.cartWrapper)}>
            <div className="cart-drawer">
              <IconButton component={Link} href="/cart" role={undefined}>
                <Badge
                  max={9}
                  color="error"
                  overlap="circle"
                  badgeContent={cart.length}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
          </div>
        </Slide>
      )}
    </div>
  )
}

export default PageBackdrop
