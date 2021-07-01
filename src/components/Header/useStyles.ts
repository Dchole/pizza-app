import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor: "transparent",

      "& .MuiToolbar-root": {
        display: "flex",
        justifyContent: "space-between"
      },

      "& nav ul": {
        display: "flex",
        listStyle: "none",
        gap: theme.spacing(4),

        "& a": {
          fontSize: "1.2rem",
          color: theme.palette.text.primary
        }
      }
    },
    account: {
      display: "flex",
      alignItems: "center",
      borderRadius: 24,
      backgroundColor: "white"
    }
  })
)
