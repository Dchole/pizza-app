import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import PersonIcon from "@material-ui/icons/Person"

const Header = () => {
  return (
    <AppBar variant="outlined">
      <Toolbar>
        Lorem
        <div>
          <IconButton>
            <PersonIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
