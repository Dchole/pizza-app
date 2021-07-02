import { createStyles, lighten, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: theme.spacing(18, 0),
      backgroundColor: lighten(theme.palette.primary.light, 0.7),

      "& > div": {
        margin: "auto",
        maxWidth: 640
      },

      "& h2": {
        marginBottom: theme.spacing(4)
      }
    }
  })
)
