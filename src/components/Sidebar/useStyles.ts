import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(
  createStyles({
    paper: {
      width: "80%"
    },
    close: {
      display: "flex",
      justifyContent: "flex-end",
      padding: 8
    },
    list: {
      paddingLeft: 16,
      paddingRight: 16
    }
  })
)
