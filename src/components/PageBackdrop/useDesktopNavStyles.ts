import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useDesktopNavStyles = makeStyles(theme =>
  createStyles({
    toolbar: {
      paddingTop: 8,
      paddingBottom: 8,
      height: 70,
      top: 0,
      position: "fixed",
      width: "100%",
      zIndex: 0,
      display: "flex",
      gap: "2rem",
      justifyContent: "space-between",

      "& .MuiGrid-root": {
        width: "unset"
      }
    },
    nav: {
      display: "flex"
    },
    navLinks: {
      display: "flex",
      listStyle: "none",
      gap: "2rem",

      "& a": {
        fontFamily: theme.typography.h1.fontFamily,
        fontSize: "1.12rem",
        color: theme.palette.grey[800],

        "&:hover": {
          textDecoration: "none"
        }
      }
    },
    inline: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    },
    avatar: {
      padding: 8,

      "& .MuiAvatar-root": {
        width: 45,
        height: 45
      }
    }
  })
)
