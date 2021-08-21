import Router from "next/router"
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
import { Fragment, useEffect, useReducer, useRef, useState } from "react"
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
  const debounceTimerRef = useRef<NodeJS.Timeout>(null)
  const desktop = useScreenSize()
  const [updating, setUpdating] = useState(false)
  const { getItemQuantity, setQuantity, removeItem, calculating } = useCart()
  const [sizes, dispatch] = useReducer(
    sizeReducer,
    initialState,
    initialState => ({ ...initialState, ...item.quantity })
  )

  const handleIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { size } = event.currentTarget.dataset
    dispatch({ type: "INCREMENT", size })
  }

  const handleDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { size } = event.currentTarget.dataset
    dispatch({ type: "DECREMENT", size })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [{ textContent }] = event.target.labels
    const size = textContent.toLowerCase()
    const quantity = !isNaN(+event.target.value)
      ? +event.target.value
      : sizes[size]

    dispatch({ type: "SET_QUANTITY", size, quantity })
  }

  const handleRemove = async () => {
    await removeItem(item.id)
    Router.replace("/cart")
  }

  useEffect(() => {
    if (item.id) {
      setUpdating(true)
      clearTimeout(debounceTimerRef.current)

      debounceTimerRef.current = setTimeout(() => {
        const res = Object.entries(sizes).map(([size, quantity]) =>
          quantity ? [size, quantity] : null
        )

        setQuantity(item.id, Object.fromEntries(res.filter(Boolean))).then(() =>
          setUpdating(false)
        )
      }, 800)
    }
  }, [item.id, sizes, setQuantity])

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
              inputProps={{ inputMode: "numeric" }}
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
                    disabled={!sizes[size]}
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
            disabled={updating || calculating}
            onClick={handleRemove}
          >
            Remove Item
          </Button>
          <Button
            size={desktop ? "small" : undefined}
            color="primary"
            variant="contained"
            disableElevation
            disabled={updating || calculating}
          >
            Buy now
          </Button>
        </div>
      </div>
    </>
  )
}

export default CartControls
