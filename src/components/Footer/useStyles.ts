import { makeStyles, createStyles, lighten } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      position: "relative",
      paddingTop: 40,
      backgroundColor: lighten(theme.palette.primary.light, 0.8),

      "& > div": {
        padding: 8,
        display: "flex",
        flexWrap: "wrap",
        gap: 48
      },

      [theme.breakpoints.up("sm")]: {
        paddingTop: 64,

        "& > div": {
          flexDirection: "row",
          justifyContent: "center",
          gap: theme.spacing(15)
        }
      }
    },
    hiring: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "auto",
      maxWidth: 270,

      [theme.breakpoints.up("md")]: {
        display: "block"
      },

      "& p": {
        maxWidth: 200,
        padding: theme.spacing(2, 0)
      }
    },
    contacts: {
      maxWidth: "max-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "auto",

      "& h3": {
        marginBottom: 12
      },

      "& .MuiListItem-root": {
        gap: 8
      },

      "& .MuiListItemIcon-root": {
        minWidth: 20
      }
    },
    newsletter: {
      maxWidth: 500,

      "& p": {
        maxWidth: 300,
        padding: theme.spacing(2, 0)
      }
    },
    centerAlign: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "auto",

      [theme.breakpoints.up("md")]: {
        margin: "initial"
      }
    },
    adornedEnd: {
      paddingRight: 0
    },
    inputMarginDense: {
      paddingTop: 8
    },
    base: {
      padding: theme.spacing(3),
      backgroundColor: lighten(theme.palette.primary.light, 0.6),
      marginTop: theme.spacing(4)
    },
    fab: {
      display: "none",

      [theme.breakpoints.up("sm")]: {
        position: "absolute",
        backgroundColor: lighten(theme.palette.secondary.light, 0.5),
        bottom: "12%",
        right: "5%"
      }
    }
  })
)
