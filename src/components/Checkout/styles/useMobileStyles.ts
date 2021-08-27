import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useMobileStyles = makeStyles(theme =>
  createStyles({
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 12
    },
    price: {
      fontSize: theme.typography.h3.fontSize,

      "& small": {
        color: theme.palette.text.secondary
      }
    }
  })
)
