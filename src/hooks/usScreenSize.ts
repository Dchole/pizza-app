import { useTheme } from "@material-ui/core/styles"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import useMediaQuery from "@material-ui/core/useMediaQuery"

const useSmallScreen = (size: Breakpoint = "xs") => {
  const { breakpoints } = useTheme()
  return useMediaQuery(breakpoints.down(size))
}

export default useSmallScreen
