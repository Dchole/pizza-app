import clsx from "clsx"
import Image from "next/image"
import Toolbar from "@material-ui/core/Toolbar"
import Grid from "@material-ui/core/Grid"
import Zoom from "@material-ui/core/Zoom"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import CloseIcon from "@material-ui/icons/Close"
import { useStyles } from "./useStyles"
import { useEffect, useState } from "react"

interface INavbarProps {
  open: boolean
  handleClose: () => void
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Navbar: React.FC<INavbarProps> = ({ open, handleOpen, handleClose }) => {
  const classes = useStyles()
  const [openTransition, setOpenTransition] = useState(false) // Transition for elements that appear when closed
  const [closeTransition, setCloseTransition] = useState(false) // Transition for elements that appear when open

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (open) {
      timeout = setTimeout(() => setOpenTransition(open), 350)
      setCloseTransition(open)
    } else {
      timeout = setTimeout(() => setCloseTransition(open), 350)
      setOpenTransition(open)
    }

    return () => clearTimeout(timeout)
  }, [open])

  return (
    <Toolbar component="header" className={classes.toolbar}>
      <Grid alignItems="center" container>
        <Zoom in={!closeTransition} timeout={150} unmountOnExit mountOnEnter>
          <IconButton
            data-direction="left"
            aria-label="open navigation menu"
            onClick={handleOpen}
          >
            <MenuIcon />
          </IconButton>
        </Zoom>
        <Zoom in={!closeTransition} timeout={150} unmountOnExit mountOnEnter>
          <div>
            <Image
              src="/logo-placeholder.svg"
              alt="logo"
              width={35}
              height={58}
            />
          </div>
        </Zoom>
      </Grid>
      <Zoom in={!closeTransition} timeout={150} unmountOnExit mountOnEnter>
        <IconButton
          className={open ? clsx(classes.navEl, classes.shrink) : classes.navEl}
          data-direction="right"
          aria-label="open search and filter options"
          onClick={handleOpen}
        >
          <SearchIcon />
        </IconButton>
      </Zoom>
      <Zoom unmountOnExit mountOnEnter in={openTransition} timeout={150}>
        <IconButton aria-label="close menu" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Zoom>
    </Toolbar>
  )
}

export default Navbar
