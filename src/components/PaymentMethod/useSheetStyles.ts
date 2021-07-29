import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useSheetStyles = makeStyles(theme =>
  createStyles({
    title: {
      margin: 5
    },
    spacing: {
      padding: theme.spacing(3, 1),
      gap: 12
    }
  })
)
