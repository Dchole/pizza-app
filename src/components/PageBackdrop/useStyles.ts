import { makeStyles, createStyles, lighten } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor: lighten(theme.palette.primary.light, 0.6)
    },
    toolbar: {
      paddingTop: 8,
      paddingBottom: 8,
      height: 80
    },
    paper: {
      padding: theme.spacing(2),
      boxShadow: `0px -2px 3px 0px rgb(0 0 0 / 12%),
                  0px -1px 1px 0px rgb(0 0 0 / 14%), 
                  0px -1px 1px -1px rgb(0 0 0 / 20%)`,
      height: "-webkit-fill-available",

      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3)
      }
    },
    cart: {
      position: "fixed",
      right: 0,
      bottom: 0,
      padding: theme.spacing(1, 2, 1, 1),
      backgroundColor: lighten(theme.palette.primary.light, 0.6),
      boxShadow: theme.shadows[3]
    }
  })
)
