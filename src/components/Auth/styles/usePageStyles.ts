import { createStyles, makeStyles } from "@material-ui/core/styles"

export const usePageStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: theme.spacing(2)
    }
  })
)
