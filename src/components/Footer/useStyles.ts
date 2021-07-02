import { makeStyles, createStyles, lighten } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      position: "relative",
      padding: theme.spacing(8, 0, 0),
      backgroundColor: lighten(theme.palette.primary.light, 0.8),

      "& > div": {
        display: "flex",
        justifyContent: "center",
        gap: theme.spacing(10)
      }
    },
    hiring: {
      maxWidth: 270,

      "& p": {
        maxWidth: 200,
        padding: theme.spacing(2, 0)
      }
    },
    contacts: {
      maxWidth: "max-content",

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
    adornedEnd: {
      paddingRight: 0
    },
    inputMarginDense: {
      paddingTop: 8
    },
    inputButton: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    },
    base: {
      padding: theme.spacing(3),
      backgroundColor: "white",
      marginTop: theme.spacing(4)
    }
  })
)
