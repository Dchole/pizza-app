import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      paddingBottom: 90,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      height: "80vh",

      [theme.breakpoints.up("md")]: {
        height: "100vh",

        "& h1": {
          width: "55%"
        }
      }
    },
    cover: {
      zIndex: -1
    },
    buttons: {
      display: "flex",
      gap: theme.spacing(2),
      marginTop: theme.spacing(4),
      justifyContent: "center",

      [theme.breakpoints.up("md")]: {
        justifyContent: "flex-start"
      },

      "& .MuiButton-outlinedPrimary": {
        borderWidth: 2
      }
    }
  })
)
