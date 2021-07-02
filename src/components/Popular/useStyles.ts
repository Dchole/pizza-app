import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: theme.spacing(18, 0),

      "& h2": {
        marginBottom: 10
      }
    },
    list: {
      gap: "3vw",
      margin: theme.spacing(5, "auto"),

      "& .details": {
        marginTop: theme.spacing(2),

        "& *": {
          display: "block"
        }
      }
    },
    buttonBase: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2),
      borderRadius: 4,
      transition: theme.transitions.create("box-shadow", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shortest
      }),

      "&:hover, &:focus": {
        boxShadow: theme.shadows[2],

        "& .MuiIconButton-root": {
          backgroundColor: "white",
          borderColor: theme.palette.grey[400]
        }
      },

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
      }
    },
    buttonWrapper: {
      display: "flex",
      margin: theme.spacing(5, 20, 0, 0),
      justifyContent: "flex-end"
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
