import { createStyles, makeStyles } from "@material-ui/core"

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
        gap: theme.spacing(4)
      }
    }
  })
)
