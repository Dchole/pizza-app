import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: theme.spacing(8, 0),

      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(18, 0)
      },

      "& h2": {
        marginBottom: 10
      }
    },
    text: {
      padding: theme.spacing(0, 1)
    },
    list: {
      gap: 16,
      margin: theme.spacing(5, "auto"),
      padding: theme.spacing(1),
      width: "100%",
      overflow: "auto",

      [theme.breakpoints.up("sm")]: {
        gap: "3vw",
        padding: theme.spacing(1, 2)
      },

      [theme.breakpoints.up("md")]: {
        justifyContent: "center"
      },

      "& .details": {
        marginTop: theme.spacing(2),

        "& *": {
          display: "block"
        }
      }
    },
    product: {
      position: "relative",

      "& .MuiIconButton-root": {
        position: "absolute",
        top: 20,
        left: 20,
        backgroundColor: "#fffa",
        border: `2px solid`,
        borderColor: "#fff2",
        transition: theme.transitions.create("background-color", {
          duration: theme.transitions.duration.shortest
        }),

        "&:focus": {
          backgroundColor: "white",
          borderColor: theme.palette.grey[400]
        }
      },

      "&:hover, &:focus-within": {
        "& .MuiIconButton-root": {
          backgroundColor: "white",
          borderColor: theme.palette.grey[400]
        }
      }
    },
    buttonBase: {
      display: "flex",
      minWidth: 300,
      flexDirection: "column",
      padding: theme.spacing(2),
      borderRadius: 4,
      transition: theme.transitions.create("box-shadow", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shortest
      }),

      "&:hover, &:focus": {
        boxShadow: theme.shadows[2]
      }
    },
    buttonWrapper: {
      display: "flex",
      justifyContent: "flex-end",
      marginRight: 16
    },
    ripple: {
      backgroundColor: theme.palette.primary.light,
      opacity: 0.6
    },
    childPulsate: {
      animation: "none"
    },
    rippleVisible: {
      transform: "scale(2)",
      animation: `$enter ${theme.transitions.duration.complex}ms ${theme.transitions.easing.easeInOut}`
    },
    "@keyframes enter": {
      "0%": {
        transform: "scale(0)",
        opacity: 0.1
      },
      "100%": {
        transform: "scale(2)",
        opacity: 0.3
      }
    }
  })
)
