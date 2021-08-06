import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import AddIcon from "@material-ui/icons/Add"
import CloseIcon from "@material-ui/icons/Close"
import RemoveIcon from "@material-ui/icons/Remove"
import { capitalize } from "lodash"
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
  const { getItemPrice, getItemQuantity, incrementItem, decrementItem } =
    useCart()

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
          <Typography variant="body1">
            Select Quantity ({getItemQuantity(item.id)})
          </Typography>
          <div>
            {["small", "medium", "large"].map(size => (
              <>
                <Typography
                  component="label"
                  htmlFor={`${size}-quantity-input`}
                  variant="caption"
                  color="textSecondary"
                >
                  {capitalize(size)}
                </Typography>
                <OutlinedInput
                  id={`${size}-quantity-input`}
                  name={size}
                  classes={{ input: classes.input }}
                  value={item.quantity[size] ?? 0}
                  startAdornment={
                    <InputAdornment position="start">
                      <IconButton aria-label="increment quantity">
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="decrement quantity">
                        <RemoveIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  fullWidth
                />
              </>
            ))}
            <div className={classes.actions}>
              <Button size="small" color="primary" variant="outlined">
                Remove Item
              </Button>
              <Button
                size="small"
                color="primary"
                variant="contained"
                disableElevation
              >
                Buy now (&#8373; {getItemPrice(item.id)})
              </Button>
            </div>
          </div>
        </Paper>
      )}
    </>
  )
}

export default SelectedCartItem
