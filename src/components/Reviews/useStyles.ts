import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      maxWidth: 500,
      margin: theme.spacing(15, "auto"),
      padding: theme.spacing(0, 2),

      [theme.breakpoints.up("sm")]: {
        padding: 0
      },

      "& .MuiTypography-alignCenter": {
        margin: theme.spacing(4, "auto")
      },

      "& > div": {
        position: "relative"
      }
    }
  })
)
