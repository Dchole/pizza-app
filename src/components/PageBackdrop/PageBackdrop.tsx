import "@fontsource/montserrat/500.css"

import { useState, useCallback } from "react"
import clsx from "clsx"
import dynamic from "next/dynamic"
import Paper from "@material-ui/core/Paper"
import Slide from "@material-ui/core/Slide"
import IconButton from "@material-ui/core/IconButton"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import Navbar from "./Navbar"
import { useStyles } from "./useStyles"

const SideNav = dynamic(() => import("./SideNav"))
const Filter = dynamic(() => import("./Filter"))

type TDirection = "left" | "right" | "up"

const PageBackdrop: React.FC = ({ children }) => {
  const classes = useStyles()
  const [direction, setDirection] = useState<TDirection>("up")
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)

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
      <Navbar open={open} handleOpen={handleOpen} handleClose={handleClose} />
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
      <Slide direction="left" in={!open}>
        <div className={clsx(classes.hideIconBtn, classes.cartWrapper)}>
          <div className="cart-drawer">
            <IconButton>
              <ShoppingCartIcon />
            </IconButton>
          </div>
        </div>
      </Slide>
    </div>
  )
}

export default PageBackdrop
