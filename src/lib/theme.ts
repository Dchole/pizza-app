import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Rubik", sans-serif',
    h1: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700
    },
    h2: {
      fontFamily: '"Montserrat", sans-serif'
    },
    h3: {
      fontFamily: '"Montserrat", sans-serif'
    }
  },
  palette: {
    primary: {
      main: "#E56C38"
    },
    secondary: {
      main: "#2F80ED"
    }
  }
})

export default theme
