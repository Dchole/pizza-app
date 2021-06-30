import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    cover: {
      transform: "scaleX(-1)",
      zIndex: -1
    },
    buttons: {
      display: "flex",
      gap: theme.spacing(2)
    }
  })
)
