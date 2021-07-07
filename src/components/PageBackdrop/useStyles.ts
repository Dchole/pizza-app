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
      padding: theme.spacing(2, 2, 4),
      boxShadow: `0px -2px 3px 0px rgb(0 0 0 / 12%),
                  0px -1px 1px 0px rgb(0 0 0 / 14%), 
                  0px -1px 1px -1px rgb(0 0 0 / 20%)`,
      position: "relative",
      zIndex: theme.zIndex.appBar,
      minHeight: "100vh",

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
    cartWrapper: {
      position: "fixed",
      right: 0,
      bottom: 0,
      zIndex: theme.zIndex.modal,
      filter: `drop-shadow(-1px 0px 2px rgba(50, 50, 0, 0.3))`,

      "& .cart-drawer": {
        padding: theme.spacing(1.4, 2, 1),
        clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%, 0 40%)",
        backgroundColor: lighten(theme.palette.primary.light, 0.6)
      }
    },
    hide: {
      display: "none"
    }
  })
)
