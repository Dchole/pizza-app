import CircularProgress from "@material-ui/core/CircularProgress"
import PageBackdrop from "@/components/PageBackdrop"
import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(
  createStyles({
    loader: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }
  })
)

const Cart = () => {
  const classes = useStyles()

  return (
    <PageBackdrop>
      <div className={classes.loader}>
        <CircularProgress />
      </div>
    </PageBackdrop>
  )
}

export default Cart
