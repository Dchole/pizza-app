import { makeStyles, createStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      height: "100vh",
      backgroundColor: theme.palette.primary.light
    }
  })
)
