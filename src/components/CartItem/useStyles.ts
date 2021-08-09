import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    link: {
      "&:hover, &:focus, &:active": {
        textDecoration: "none"
      }
    },
    root: {
      padding: 8,
      marginBottom: 8,
      width: "min(100%, 600px)",

      [theme.breakpoints.up("sm")]: {
        display: "flex",
        padding: 0,
        cursor: "pointer",
        position: "relative",
        outlineColor: theme.palette.primary.main,
        transition: theme.transitions.create(
          ["background-color", "border-color"],
          {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeOut
          }
        )
      }
    },
    content: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      padding: theme.spacing(1),
      gap: 24,

      [theme.breakpoints.up("sm")]: {
        padding: 8,

        "&:last-child": {
          paddingBottom: 8
        }
      }
    },
    title: {
      display: "flex",
      gap: 10,

      "& > div": {
        display: "flex",
        flexDirection: "column",
        gap: 6
      },

      [theme.breakpoints.up("sm")]: {
        fontWeight: 600,
        alignItems: "center",
        justifyContent: "space-between",

        "& .MuiTypography-h3": {
          fontSize: theme.typography.h4.fontSize,

          "&:active": {
            textDecoration: "none",
            color: theme.palette.primary.dark
          }
        }
      },

      "& small:first-child": {
        position: "relative",
        top: -1.5
      },

      "& small": {
        fontSize: 14
      },

      "& span.price": {
        color: theme.palette.grey[700],
        position: "relative",
        top: 2
      }
    },
    actionArea: {
      [theme.breakpoints.up("sm")]: {
        width: "fit-content"
      }
    },
    cover: {
      width: "100%",
      height: 220,
      position: "relative",

      [theme.breakpoints.up("sm")]: {
        width: 200,
        height: "100%"
      }
    },
    controls: {
      display: "flex",
      height: 20,
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "0.4px solid rgba(0, 0, 0, 0.12)"
    },
    label: {
      padding: theme.spacing(0, 1)
    },
    image: {
      borderRadius: 10,

      [theme.breakpoints.up("sm")]: {
        borderRadius: 0,
        width: "100%"
      }
    },
    input: {
      height: "100%"
    },
    iconButton: {
      borderRadius: 0
    },
    borderRight: {
      borderRight: "0.4px solid rgba(0, 0, 0, 0.12)"
    },
    borderLeft: {
      borderLeft: "0.4px solid rgba(0, 0, 0, 0.12)"
    },
    sizes: {
      flexDirection: "column",

      "& > div": {
        marginTop: 5,
        paddingLeft: 8,
        gap: 16,
        display: "flex",
        justifyContent: "center",
        margin: theme.spacing(2, "auto"),

        [theme.breakpoints.up("sm")]: {
          margin: "inherit",
          justifyContent: "flex-start"
        }
      }
    },
    actions: {
      display: "flex",
      justifyContent: "space-between",

      [theme.breakpoints.up("sm")]: {
        gap: 16,
        justifyContent: "flex-end"
      }
    }
  })
)
