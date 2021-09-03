import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useDesktopStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      marginTop: 20
    },
    divider: {
      height: 400,
      margin: theme.spacing(0, 8)
    },
    image: {
      borderRadius: 10
    },
    imageWrapper: {
      position: "relative",
      marginBottom: 8,
      width: "100%",
      height: 236
    },
    quantity: {
      display: "flex",
      gap: 8,
      marginTop: 16
    },
    item: {
      minWidth: 273
    },
    itemText: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    itemList: {
      minWidth: 320,
      marginBottom: 12,

      "& .item-details": {
        display: "flex",
        gap: 12,
        marginBottom: 28,

        "& .item-text": {
          width: "100%"
        },

        "& .item-header": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "fit-content",

          "& .MuiTypography-h5": {
            fontFamily: theme.typography.h1.fontFamily
          }
        }
      }
    }
  })
)
