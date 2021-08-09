import AddIcon from "@material-ui/icons/Add"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import RemoveIcon from "@material-ui/icons/Remove"
import Typography from "@material-ui/core/Typography"
import { capitalize } from "lodash"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { TCartItemDetails, useCart } from "../CartContext"
import { Fragment, useEffect, useReducer } from "react"
import useScreenSize from "@/hooks/usScreenSize"
import sizeReducer, { initialState } from "./sizeReducer"

const useStyles = makeStyles(theme =>
  createStyles({
    input: {
      textAlign: "center"
    },
    actions: {
      marginTop: 18,
      display: "flex",
      justifyContent: "space-between",

      [theme.breakpoints.up("sm")]: {
        marginTop: 8
      }
    }
  })
)

interface ICartControlsProps {
  item: TCartItemDetails
}

const CartControls: React.FC<ICartControlsProps> = ({ item }) => {
  const classes = useStyles()
  const desktop = useScreenSize()
  const { getItemQuantity, setQuantity, incrementItem, decrementItem } =
    useCart()
  const [sizes, dispatch] = useReducer(
    sizeReducer,
    initialState,
    initialState => ({ ...initialState, ...item.quantity })
  )

  const handleIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { size } = event.currentTarget.dataset
    dispatch({ type: "INCREMENT", size })
    incrementItem(item.id, size)
  }

  const handleDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { size } = event.currentTarget.dataset
    dispatch({ type: "DECREMENT", size })
    decrementItem(item.id, size)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [{ textContent }] = event.target.labels
    const size = textContent.toLowerCase()
    const quantity = !isNaN(+event.target.value)
      ? +event.target.value
      : sizes[size]

    dispatch({ type: "SET_QUANTITY", size, quantity })
    setQuantity(item.id, sizes)
  }

  return (
    <>
      <Typography
        variant="h6"
        component="h2"
        title={`${getItemQuantity(item.id)} ${item.name}s added`}
      >
        Select Quantity ({getItemQuantity(item.id)})
      </Typography>
      <div>
        {["small", "medium", "large"].map(size => (
          <Fragment key={size}>
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
              value={sizes[size]}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton
                    data-size={size}
                    onClick={handleIncrement}
                    aria-label="increment quantity"
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    data-size={size}
                    onClick={handleDecrement}
                    aria-label="decrement quantity"
                    disabled={!item.quantity[size]}
                  >
                    <RemoveIcon />
                  </IconButton>
                </InputAdornment>
              }
              fullWidth
            />
          </Fragment>
        ))}
        <div className={classes.actions}>
          <Button
            size={desktop ? "small" : undefined}
            color="primary"
            variant="outlined"
          >
            Remove Item
          </Button>
          <Button
            size={desktop ? "small" : undefined}
            color="primary"
            variant="contained"
            disableElevation
          >
            Buy now
          </Button>
        </div>
      </div>
    </>
  )
}

export default CartControls
