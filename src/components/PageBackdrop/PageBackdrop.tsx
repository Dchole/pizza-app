import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import Navbar from "./Navbar"
import { useStyles } from "./useStyles"

const PageBackdrop: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Navbar />
      <Paper className={classes.paper}>{children}</Paper>
      <div className={classes.cart}>
        <IconButton>
          <ShoppingCartIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default PageBackdrop
