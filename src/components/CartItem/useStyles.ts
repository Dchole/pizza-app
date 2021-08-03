import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: "min(100%, 600px)",

      [theme.breakpoints.up("sm")]: {
        display: "flex"
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
      justifyContent: "space-between",
      alignItems: "center",

      "& .MuiTypography-h3": {
        fontWeight: 600,

        [theme.breakpoints.up("sm")]: {
          fontSize: theme.typography.h4.fontSize
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
      width: "100%"
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
        display: "flex"
      }
    },
    actions: {
      justifyContent: "space-between",

      [theme.breakpoints.up("sm")]: {
        gap: 16,
        display: "flex",
        justifyContent: "flex-end"
      }
    }
  })
)
