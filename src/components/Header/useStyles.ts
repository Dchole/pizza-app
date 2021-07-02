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
      gap: theme.spacing(4)
    }
  })
)
