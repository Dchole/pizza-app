import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: 600,
      margin: theme.spacing(8, "auto"),

      "& h2": {
        marginBottom: theme.spacing(4)
      }
    }
  })
)
