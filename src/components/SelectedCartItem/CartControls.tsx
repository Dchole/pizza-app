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
import useScreenSize from "@/hooks/usScreenSize"

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
  const { getItemQuantity } = useCart()

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
