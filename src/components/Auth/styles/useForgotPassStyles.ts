import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useForgotPassStyles = makeStyles(theme =>
  createStyles({
    paper: {
      marginTop: 0,
      padding: theme.spacing(2),
      height: "100vh",

      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(2, 4),
        height: "initial",
        marginTop: 24
      }
    },
    buttonWrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginBottom: 16,

      [theme.breakpoints.up("sm")]: {
        marginBottom: "initial"
      },

      "& .MuiButton-root": {
        margin: theme.spacing(1, "auto"),
        position: "relative",
        maxWidth: "100%",
        width: 200,

        "& .MuiCircularProgress-root": {
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: -12,
          marginLeft: -12
        }
      }
    }
  })
)
