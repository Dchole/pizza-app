import { makeStyles, createStyles, lighten } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor: lighten(theme.palette.primary.light, 0.6),
      paddingTop: 80
    },
    toolbar: {
      paddingTop: 8,
      paddingBottom: 8,
      height: 80,
      top: 0,
      position: "fixed",
      width: "100%",
      zIndex: 0
    },
    paper: {
      padding: theme.spacing(2),
      boxShadow: `0px -2px 3px 0px rgb(0 0 0 / 12%),
                  0px -1px 1px 0px rgb(0 0 0 / 14%), 
                  0px -1px 1px -1px rgb(0 0 0 / 20%)`,
      position: "relative",
      zIndex: theme.zIndex.appBar,

      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3)
      }
    },
    sidenav: {
      position: "absolute",
      width: "100%",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    },
    filter: {
      position: "absolute",
      width: "100%",
      top: 100
    },
    cart: {
      position: "fixed",
      right: 0,
      bottom: 0,
      padding: theme.spacing(1, 2, 1, 1),
      backgroundColor: lighten(theme.palette.primary.light, 0.6),
      boxShadow: theme.shadows[3]
    },
    hide: {
      visibility: "hidden"
    }
  })
)
