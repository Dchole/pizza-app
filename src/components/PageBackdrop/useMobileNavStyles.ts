import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useMobileNavStyles = makeStyles(theme =>
  createStyles({
    toolbar: {
      paddingTop: 8,
      paddingBottom: 8,
      height: 70,
      top: 0,
      position: "fixed",
      width: "100%",
      zIndex: 0
    }
  })
)
