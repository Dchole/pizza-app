import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useDrawerStyles = makeStyles(theme =>
  createStyles({
    paper: {
      padding: theme.spacing(6, 8),
      maxWidth: theme.breakpoints.values.sm
    },
    backdrop: {
      "@supports (backdrop-filter: blur(4px))": {
        backgroundColor: "#ccc7",
        backdropFilter: "blur(6px)"
      }
    }
  })
)
