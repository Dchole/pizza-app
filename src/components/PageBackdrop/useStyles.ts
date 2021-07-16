import { makeStyles, createStyles, lighten } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor: lighten(theme.palette.primary.light, 0.6),
      paddingTop: 70
    },
    hideOnLarge: {
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    paper: {
      padding: theme.spacing(2, 2, 4),
      boxShadow: `0px -2px 3px 0px rgb(0 0 0 / 12%),
      0px -1px 1px 0px rgb(0 0 0 / 14%), 
                  0px -1px 1px -1px rgb(0 0 0 / 20%)`,
      position: "relative",
      zIndex: theme.zIndex.appBar,
      minHeight: "80vh",

      "@media(max-width: 320px)": {
        padding: theme.spacing(1, 1, 4)
      },

      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3, 3, 10)
      }
    },
    aside: {
      position: "fixed",
      width: "100%"
    },
    sidenav: {
      top: "50%",
      left: "50%",
      overflowX: "hidden",
      transform: "translate(-50%, -50%)"
    },
    filter: {
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
