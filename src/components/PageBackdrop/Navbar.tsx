import { useEffect, useState } from "react"
import Image from "next/image"
import Toolbar from "@material-ui/core/Toolbar"
import Grid from "@material-ui/core/Grid"
import Zoom from "@material-ui/core/Zoom"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import CloseIcon from "@material-ui/icons/Close"
import { useStyles } from "./useStyles"

interface INavbarProps {
  open: boolean
  handleClose: () => void
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Navbar: React.FC<INavbarProps> = ({ open, handleOpen, handleClose }) => {
  const classes = useStyles()
  const [navElTransition, setNavElTransition] = useState(false)
  const [closeBtnTransition, setCloseBtnTransition] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (open) {
      timeout = setTimeout(() => setNavElTransition(open), 150)
      setCloseBtnTransition(open)
    } else {
      timeout = setTimeout(() => setCloseBtnTransition(open), 150)
      setNavElTransition(open)
    }

    return () => clearTimeout(timeout)
  }, [open])

  return (
    <Toolbar component="header" className={classes.toolbar}>
      <Grid alignItems="center" container>
        <Zoom in={!closeBtnTransition} timeout={150} unmountOnExit mountOnEnter>
          <IconButton
            data-direction="left"
            aria-label="open navigation menu"
            onClick={handleOpen}
          >
            <MenuIcon />
          </IconButton>
        </Zoom>
        <Zoom in={!closeBtnTransition} timeout={150} unmountOnExit mountOnEnter>
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
      <Zoom in={!closeBtnTransition} timeout={150} unmountOnExit mountOnEnter>
        <IconButton
          data-direction="right"
          aria-label="open search and filter options"
          onClick={handleOpen}
        >
          <SearchIcon />
        </IconButton>
      </Zoom>
      <Zoom unmountOnExit mountOnEnter in={navElTransition} timeout={150}>
        <IconButton aria-label="close menu" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Zoom>
    </Toolbar>
  )
}

export default Navbar
