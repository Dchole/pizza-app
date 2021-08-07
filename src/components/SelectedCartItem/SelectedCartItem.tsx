import IconButton from "@material-ui/core/IconButton"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import CloseIcon from "@material-ui/icons/Close"
import CartControls from "./CartControls"
import { TCartItemDetails, useCart } from "../CartContext"
import { useStyles } from "./useStyles"

interface ISelectedCartItemProps {
  item: TCartItemDetails
  handleDeselect: () => void
}

const SelectedCartItem: React.FC<ISelectedCartItemProps> = ({
  item,
  handleDeselect
}) => {
  const classes = useStyles()
  const { getItemQuantity } = useCart()

  return (
    <>
      {item.pizza_id && (
        <Paper
          variant="outlined"
          component="section"
          aria-labelledby="selected-item-heading"
          className={classes.root}
        >
          <div>
            <Typography
              variant="srOnly"
              id="selected-item-heading"
              component="h2"
            >
              Selected cart item
            </Typography>
            <Typography variant="h5" component="h3">
              {item.name}
            </Typography>
            <IconButton
              onClick={handleDeselect}
              aria-label={`deselect ${item.name}`}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <CartControls item={item} />
        </Paper>
      )}
    </>
  )
}

export default SelectedCartItem
