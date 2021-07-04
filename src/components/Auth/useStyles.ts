import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    paper: {
      padding: theme.spacing(4, 3),
      maxWidth: theme.breakpoints.values.sm
    }
  })
)
