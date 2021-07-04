import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    link: {
      "&:focus": {
        margin: theme.spacing(2),
        padding: theme.spacing(1, 2),
        width: "fit-content",
        height: 20,
        display: "grid",
        placeItems: "center",
        color: "white",
        backgroundColor: "#08f",
        boxSizing: "content-box",
        textTransform: "uppercase",
        zIndex: theme.zIndex.modal
      }
    }
  })
)
