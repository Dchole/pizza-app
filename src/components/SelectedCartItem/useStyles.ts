import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: 8,
      position: "sticky",
      top: 20,
      height: "fit-content",

      "& > div:first-child": {
        display: "flex",
        marginBottom: 8,
        alignItems: "center",
        justifyContent: "space-between"
      },

      "& .MuiTypography-h5": {
        fontFamily: theme.typography.h1.fontFamily
      }
    },
    input: {
      textAlign: "center"
    },
    actions: {
      marginTop: 8,
      display: "flex",
      justifyContent: "space-between"
    }
  })
)
