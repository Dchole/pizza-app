import { createStyles, makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      margin: theme.spacing(6, "auto"),

      "& h3": {
        margin: theme.spacing(2, 0)
      },

      "& .MuiGrid-root": {
        maxWidth: "80%",
        gap: theme.spacing(6),
        margin: theme.spacing(4, "auto")
      }
    }
  })
)
