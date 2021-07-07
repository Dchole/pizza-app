import { useState } from "react"
import Paper from "@material-ui/core/Paper"
import Slide from "@material-ui/core/Slide"
import IconButton from "@material-ui/core/IconButton"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import Navbar from "./Navbar"
import SideNav from "./SideNav"
import Filter from "./Filter"
import { useStyles } from "./useStyles"
import { IPizzaProps } from "../Popular"
import { useCallback } from "react"

type TDirection = "left" | "right"

const PageBackdrop: React.FC<Partial<IPizzaProps>> = ({ pizzas, children }) => {
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
      <div className={direction === "left" ? classes.sidenav : classes.hide}>
        <SideNav handleClose={handleClose} />
      </div>
      <div className={direction === "right" ? classes.filter : classes.hide}>
        <Filter pizzas={pizzas} handleClose={handleClose} />
      </div>
      <Slide direction="left" in={!open}>
        <div className={classes.cart}>
          <IconButton>
            <ShoppingCartIcon />
          </IconButton>
        </div>
      </Slide>
    </div>
  )
}

export default PageBackdrop
