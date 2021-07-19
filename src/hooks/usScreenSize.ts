import { useTheme } from "@material-ui/core/styles"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
import useMediaQuery from "@material-ui/core/useMediaQuery"

const useScreenSize = (size: Breakpoint = "sm") => {
  const { breakpoints } = useTheme()
  return useMediaQuery(breakpoints.up(size))
}

export default useScreenSize
