import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"

const useSmallScreen = () => {
  const { breakpoints } = useTheme()
  return useMediaQuery(breakpoints.down("xs"))
}

export default useSmallScreen
