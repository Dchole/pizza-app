import Image from "next/image"
import Toolbar from "@material-ui/core/Toolbar"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { useStyles } from "./useStyles"

const Navbar = () => {
  const classes = useStyles()

  return (
    <Toolbar component="header" className={classes.toolbar}>
      <Grid alignItems="center" container>
        <IconButton aria-label="open navigation menu">
          <MenuIcon />
        </IconButton>
        <Image src="/logo-placeholder.svg" alt="logo" width={35} height={58} />
      </Grid>
    </Toolbar>
  )
}

export default Navbar
