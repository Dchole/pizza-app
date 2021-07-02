import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      maxWidth: 500,
      margin: theme.spacing(15, "auto"),

      "& .MuiTypography-alignCenter": {
        margin: theme.spacing(4, "auto")
      },

      "& > div": {
        position: "relative"
      }
    }
  })
)
