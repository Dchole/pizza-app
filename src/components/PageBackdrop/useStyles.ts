import { makeStyles, createStyles, lighten } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor: lighten(theme.palette.primary.light, 0.6),
      paddingTop: 70
    },
    toolbar: {
      paddingTop: 8,
      paddingBottom: 8,
      height: 70,
      top: 0,
      position: "fixed",
      width: "100%",
      zIndex: 0,

      "& .MuiGrid-root": {
        width: "unset"
      },

      [theme.breakpoints.up("sm")]: {
        display: "flex",
        gap: "2rem",
        justifyContent: "space-between"
      }
    },
    nav: {
      [theme.breakpoints.up("sm")]: {
        display: "flex"
      }
    },
    navLinks: {
      display: "flex",
      listStyle: "none",
      gap: "2rem",

      "& a": {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: "1.12rem",
        color: theme.palette.grey[800],

        "&:hover": {
          textDecoration: "none"
        }
      }
    },
    hideIconBtn: {
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    hideOnLarge: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
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
    },
    inline: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    },
    avatar: {
      padding: 8,

      "& .MuiAvatar-root": {
        width: 45,
        height: 45
      }
    },
    inputBase: {
      backgroundColor: "#fff8",
      padding: theme.spacing(0.2, 2),
      flexGrow: 1,
      maxWidth: "30%",
      fontFamily: theme.typography.h1.fontFamily,
      transition: theme.transitions.create("backgound-color", {
        duration: theme.transitions.duration.shortest
      }),

      "&:hover, &:focus-within": {
        backgroundColor: "#fffa"
      },

      "&:focus-within": {
        outline: "2px solid #454545"
      }
    }
  })
)
