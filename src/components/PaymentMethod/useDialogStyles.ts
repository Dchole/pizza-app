import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useDialogStyles = makeStyles(theme =>
  createStyles({
    title: {
      "& .MuiTypography-root": {
        color: theme.palette.grey[800],
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: theme.typography.h4.fontSize
      }
    },
    content: {
      display: "flex",
      gap: 24,
      marginBottom: 24
    },
    button: {
      padding: theme.spacing(2),
      border: `1px solid ${theme.palette.grey[300]}`,
      flexDirection: "column",
      alignItems: "flex-start",
      transition: theme.transitions.create("background-color"),

      "&:hover, &:focus": {
        backgroundColor: theme.palette.grey[100]
      },

      "& .MuiTypography-root": {
        textAlign: "left"
      }
    }
  })
)
