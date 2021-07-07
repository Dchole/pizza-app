import { useState } from "react"
import dynamic from "next/dynamic"
import Paper from "@material-ui/core/Paper"
import Slide from "@material-ui/core/Slide"
import IconButton from "@material-ui/core/IconButton"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import Navbar from "./Navbar"
import { useStyles } from "./useStyles"
import { useCallback } from "react"

const SideNav = dynamic(() => import("./SideNav"))
const Filter = dynamic(() => import("./Filter"))

type TDirection = "left" | "right"

const PageBackdrop: React.FC = ({ children }) => {
  const classes = useStyles()
  const [direction, setDirection] = useState<TDirection>("left")
  const [open, setOpen] = useState(false)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true)

    const { direction } = event.currentTarget.dataset
    setDirection(direction as TDirection)
  }

  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <div className={classes.root}>
      <Navbar open={open} handleOpen={handleOpen} handleClose={handleClose} />
      <Slide direction={direction} in={!open}>
        <Paper className={classes.paper}>{children}</Paper>
      </Slide>
      {direction === "left" && (
        <div className={classes.sidenav}>
          <SideNav handleClose={handleClose} />
        </div>
      )}
      {direction === "right" && (
        <div className={classes.filter}>
          <Filter
            showing={direction === "right" && open}
            handleClose={handleClose}
          />
        </div>
      )}
      <Slide direction="left" in={!open}>
        <div className={classes.cartWrapper}>
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
