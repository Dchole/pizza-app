import Paper from "@material-ui/core/Paper"
import { useStyles } from "./useStyles"

const PageBackdrop: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper component="main">{children}</Paper>
    </div>
  )
}

export default PageBackdrop
