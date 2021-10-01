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
import ButtonLink from "../ButtonLink"
import { deNullify } from "@/utils/de-nullify"

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

type TSizes = "small" | "medium" | "large"

const CartControls: React.FC<ICartControlsProps> = ({ item }) => {
  const classes = useStyles()
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
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

    dispatch({ type: "INCREMENT", size: deNullify(size) as TSizes })
  }

  const handleDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { size } = event.currentTarget.dataset
    dispatch({ type: "DECREMENT", size: deNullify(size) as TSizes })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [{ textContent }] = deNullify(event.target.labels)
    const size = deNullify(textContent).toLowerCase() as TSizes

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
      debounceTimerRef.current && clearTimeout(debounceTimerRef.current)

      debounceTimerRef.current = setTimeout(() => {
        const res = Object.entries(sizes).map(([size, quantity]) =>
          quantity ? [size, quantity] : null
        )

        const filteredRes = res.filter(Boolean) as [string, number][]
        const quantities = Object.fromEntries(filteredRes) as typeof sizes

        setQuantity(item.id, quantities).then(() => setUpdating(false))
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
              value={sizes[size as TSizes]}
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
                    disabled={!sizes[size as TSizes]}
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
          <ButtonLink
            href={{ pathname: `/checkout/${item.slug}`, query: { ...sizes } }}
            size={desktop ? "small" : undefined}
            color="primary"
            variant="contained"
            disableElevation
            disabled={updating || calculating}
          >
            Buy now
          </ButtonLink>
        </div>
      </div>
    </>
  )
}

export default CartControls
