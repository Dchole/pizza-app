import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor: "white",

      "& .MuiToolbar-root": {
        display: "flex",
        justifyContent: "space-between"
      },

      "& nav ul": {
        display: "flex",
        listStyle: "none",
        gap: theme.spacing(4),

        "& a": {
          fontSize: "1.12rem",
          color: theme.palette.text.primary
        }
      }
    },
    top: {
      backgroundColor: "transparent",
      border: "none"
    },
    account: {
      display: "flex",
      alignItems: "center",
      borderRadius: 24,
      backgroundColor: "white",
      boxShadow: theme.shadows[1]
    },
    logo: {
      margin: theme.spacing(1, 0)
    },
    nav: {
      display: "flex",
      alignItems: "center",

      [theme.breakpoints.up("sm")]: {
        gap: theme.spacing(4)
      }
    },
    avatar: {
      padding: 8,

      "&:hover, &:focus": {
        "& .MuiAvatar-root": {
          backgroundColor: theme.palette.primary.dark
        }
      },

      "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        backgroundColor: theme.palette.text.secondary,
        transition: theme.transitions.create("background-color", {
          duration: theme.transitions.duration.shortest
        })
      }
    }
  })
)
