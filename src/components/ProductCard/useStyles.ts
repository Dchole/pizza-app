import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
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
