import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      maxWidth: 500,
      margin: theme.spacing(12, "auto", 8),
      padding: theme.spacing(0, 2),

      [theme.breakpoints.up("sm")]: {
        padding: 0,
        margin: theme.spacing(15, "auto")
      },

      "& .MuiTypography-alignCenter": {
        margin: theme.spacing(4, "auto")
      },

      "& > div": {
        position: "relative"
      }
    },
    reviews: {
      height: 280,
      width: "100%",

      "& > div": {
        position: "absolute",
        overflow: "hidden",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: 1,
        width: "inherit",
        maxWidth: 400,
        transition: theme.transitions.create(["transform", "opacity"], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.short
        }),

        [theme.breakpoints.up("sm")]: {
          transition: theme.transitions.create(["transform", "opacity"], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.complex
          })
        }
      }
    }
  })
)
