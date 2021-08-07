import { useState, useEffect } from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
import Fade from "@material-ui/core/Fade"

const useStyles = makeStyles(
  createStyles({
    root: {
      height: "100%",
      width: "100%",
      display: "grid",
      placeItems: "center"
    }
  })
)

const PageLoader = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={classes.root}>
      <Fade in={loading} mountOnEnter unmountOnExit>
        <CircularProgress color="primary" />
      </Fade>
    </div>
  )
}

export default PageLoader
