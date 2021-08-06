import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useDetailPageStyles = makeStyles(theme =>
  createStyles({
    root: {
      "& h1": {
        margin: theme.spacing(1, 0, 2)
      }
    },
    headerText: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    description: {
      width: "100%",
      maxWidth: 450,
      margin: theme.spacing(2, 0)
    },
    imageWrapper: {
      position: "relative",
      width: "100%",
      height: "40vh",
      marginBottom: 16,

      [theme.breakpoints.up("sm")]: {
        height: "60vh"
      }
    },
    actions: {
      display: "flex",
      gap: 16,
      justifyContent: "space-between",

      "& .MuiButton-root": {
        width: "fit"
      },

      "@media(max-width: 320px)": {
        gap: 8
      },

      [theme.breakpoints.up("sm")]: {
        "& .MuiButton-root": {
          width: "initial"
        }
      }
    },
    sizes: {
      display: "flex",
      margin: theme.spacing(2, "auto"),
      justifyContent: "center",

      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(5, "auto")
      }
    }
  })
)
