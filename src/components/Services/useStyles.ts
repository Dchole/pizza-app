import { createStyles, makeStyles } from "@material-ui/core/styles"

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
    },
    grid: {
      [theme.breakpoints.up("md")]: {
        flexWrap: "nowrap"
      }
    },
    card: {
      minWidth: 288
    }
  })
)
