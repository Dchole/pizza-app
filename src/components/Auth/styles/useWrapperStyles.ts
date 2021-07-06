import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useWrapperStyles = makeStyles(theme =>
  createStyles({
    heading: {
      marginBottom: 24
    },
    button: {
      width: "100%",
      margin: theme.spacing(2, "auto"),
      display: "flex",
      justifyContent: "center",

      "& .MuiButtonBase-root": {
        width: "100%",
        backgroundColor: theme.palette.secondary.main,
        color: "white",

        [theme.breakpoints.up("sm")]: {
          width: "60%"
        }
      },

      "& .MuiButton-startIcon": {
        padding: 8,
        display: "grid",
        placeItems: "center",
        backgroundColor: "white",
        border: `2px solid ${theme.palette.secondary.main}`,
        boxSizing: "border-box",
        height: "100%",
        width: 40,
        position: "absolute",
        left: 0
      },

      "& .MuiTypography-button": {
        fontWeight: 500,
        flexGrow: 1
      }
    },
    divider: {
      display: "flex",
      gap: 16,
      alignItems: "center",
      justifyContent: "space-evenly",

      "& .MuiDivider-root": {
        flexGrow: 1
      }
    }
  })
)
