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
      }
    },
    buttonWrapper: {
      display: "flex",
      justifyContent: "flex-end",
      marginRight: 16
    }
  })
)
