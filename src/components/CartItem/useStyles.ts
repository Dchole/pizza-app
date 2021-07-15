import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex"
    },
    actionArea: {
      width: "fit-content"
    },
    details: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      gap: 16
    },
    content: {
      flex: "1 0 auto",
      padding: theme.spacing(1)
    },
    cover: {
      width: 151,
      height: "100%",
      position: "relative"
    },
    controls: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "0.4px solid rgba(0, 0, 0, 0.12)"
    },
    iconButton: {
      borderRadius: 0
    },
    borderRight: {
      borderRight: "0.4px solid rgba(0, 0, 0, 0.12)"
    },
    borderLeft: {
      borderLeft: "0.4px solid rgba(0, 0, 0, 0.12)"
    }
  })
)
