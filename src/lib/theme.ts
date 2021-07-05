import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"

let theme = createMuiTheme({
  typography: {
    fontFamily: '"Rubik", sans-serif',
    h1: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700
    },
    h2: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700
    },
    h3: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700
    },
    h4: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700
    }
  },
  palette: {
    primary: {
      main: "#E56C38"
    },
    secondary: {
      main: "#2F80ED"
    }
  },
  shape: {
    borderRadius: 0
  }
})

theme = responsiveFontSizes(theme, {
  factor: 3
})

export default theme
