import Image from "next/image"
import dynamic from "next/dynamic"
import { capitalize } from "lodash"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Chip from "@material-ui/core/Chip"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import CardActionArea from "@material-ui/core/CardActionArea"
import Typography from "@material-ui/core/Typography"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import IconButton from "@material-ui/core/IconButton"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"
import PaymentIcon from "@material-ui/icons/Payment"
import Link from "../Link"
import { loader } from "@/utils/imageLoader"
import { useStyles } from "./useStyles"
import { useCart, TCartItemDetails } from "../CartContext"
import { useState } from "react"
import useScreenSize from "@/hooks/usScreenSize"

const PaymentMethodDialog = dynamic(
  () => import("@/components/PaymentMethod/Dialog")
)
const PaymentMethodSheet = dynamic(
  () => import("@/components/PaymentMethod/Sheet")
)

interface ICartItemProps {
  item: TCartItemDetails
}

const CartItem: React.FC<ICartItemProps> = ({ item }) => {
  const classes = useStyles()
  const desktop = useScreenSize()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const { getItemPrice, getItemQuantity } = useCart()

  const handleSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { size } = event.currentTarget.dataset
    setSelectedSize(size)

    event.stopPropagation()
  }

  const removeSelected = () => {
    setSelectedSize(null)
  }

  return (
    <Card variant="outlined" className={classes.root} onClick={removeSelected}>
      <CardActionArea component={Link} href={`/cart/${item.slug}`}>
        <CardMedia className={classes.cover}>
          <Image
            loader={loader}
            src={item.image?.formats.small.url}
            alt={item.name}
            title={item.name}
            className={classes.image}
            layout="fill"
            objectFit="cover"
          />
        </CardMedia>
      </CardActionArea>
      <CardContent className={classes.content}>
        <div className={classes.title}>
          <Typography component="p" variant="h3">
            {item.name}
          </Typography>
          {desktop ? (
            <Typography color="textSecondary" component="p" variant="h5">
              <small>{getItemQuantity(item.id)}pcs</small> &mdash;&nbsp;
              <small className="currency">₵</small>{" "}
              <span className="price">{getItemPrice(item.id)}</span>
            </Typography>
          ) : (
            <Typography color="textSecondary" component="p" variant="h5">
              <small className="currency">₵</small>{" "}
              <span className="price">{getItemPrice(item.id)}</span>
            </Typography>
          )}
        </div>
        <div className={classes.sizes}>
          <Typography variant="caption">Sizes</Typography>
          <div>
            {Object.entries(item.quantity).map(([size, quantity]) => (
              <Chip
                key={size}
                label={capitalize(size)}
                avatar={<Avatar>{quantity}</Avatar>}
                title={`${quantity} ${size} ${
                  quantity === 1 ? "size" : "sizes"
                }`}
              />
            ))}
          </div>
        </div>
        {desktop && (
          <div className={classes.actions}>
            <Button color="primary" endIcon={<RemoveShoppingCartIcon />}>
              Remove from cart
            </Button>
            <Button
              color="primary"
              variant="outlined"
              endIcon={<PaymentIcon />}
            >
              buy now
            </Button>
          </div>
        )}
      </CardContent>
      {!desktop && (
        <CardActions className={classes.actions}>
          <Button
            size="small"
            color="primary"
            endIcon={<RemoveShoppingCartIcon />}
          >
            Remove from cart
          </Button>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            endIcon={<PaymentIcon />}
          >
            buy now
          </Button>
        </CardActions>
      )}
    </Card>
  )
}

export default CartItem
