import { createStyles, lighten, makeStyles } from "@material-ui/core/styles"

export const useFormStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "50%"
    },
    step: {
      minHeight: 372,
      position: "relative"
    },
    stepContent: {
      minHeight: 300
    },
    title: {
      marginBottom: 24
    },
    method: {
      display: "flex",
      justifyContent: "space-evenly",

      "& .MuiButtonBase-root": {
        display: "flex",
        flexDirection: "column",
        width: 160,
        height: 100,
        border: `1px solid ${theme.palette.grey[300]}`
      },

      "& .MuiTypography-h6": {
        fontFamily: theme.typography.h1.fontFamily
      }
    },
    selected: {
      backgroundColor: lighten(theme.palette.secondary.main, 0.8)
    },
    buttonWrapper: {
      marginTop: 16,
      display: "flex",
      gap: 16,
      justifyContent: "flex-end"
    }
  })
)
