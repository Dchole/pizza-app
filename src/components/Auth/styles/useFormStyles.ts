import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useFormStyles = makeStyles(theme =>
  createStyles({
    button: {
      width: "100%",
      margin: theme.spacing(2, "auto"),
      display: "flex",
      justifyContent: "center",

      "& .MuiButton-root": {
        width: "50%"
      }
    },
    link: {
      display: "flex",
      justifyContent: "flex-end"
    }
  })
)
