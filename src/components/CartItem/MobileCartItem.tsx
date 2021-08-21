import Image from "next/image"
import Router from "next/router"
import dynamic from "next/dynamic"
import { capitalize } from "lodash"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Chip from "@material-ui/core/Chip"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"
import PaymentIcon from "@material-ui/icons/Payment"
import Link from "../Link"
import { loader } from "@/utils/imageLoader"
import { useStyles } from "./useStyles"
import { useCart, TCartItemDetails } from "../CartContext"
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

const MobileCartItem: React.FC<ICartItemProps> = ({ item }) => {
  const classes = useStyles()
  const desktop = useScreenSize()
  const { removeItem, getItemPrice, getItemQuantity } = useCart()

  const handleRemove = () => {
    removeItem(item.id)
    Router.replace("/cart")
  }

  const handleBuy = (event: React.MouseEvent<HTMLButtonElement>) => {}

  return (
    <Paper variant="outlined" className={classes.root}>
      <Link href={`/cart/${item.slug}`} className={classes.link}>
        <div className={classes.title}>
          <Image
            loader={loader}
            src={item.image?.formats.thumbnail.url}
            alt={item.name}
            title={item.name}
            className={classes.image}
            width={80}
            height={80}
            objectFit="cover"
          />
          <div>
            <Typography color="textPrimary" variant="h3">
              {item.name}
            </Typography>
            <Typography color="textSecondary" component="p" variant="h5">
              <small>{getItemQuantity(item.id)}pcs</small> &mdash;&nbsp;
              <small className="currency">₵</small>{" "}
              <span className="price">{getItemPrice(item.id)}</span>
            </Typography>
          </div>
        </div>
        <div className={classes.content}>
          <div className={classes.sizes}>
            <Typography variant="h6" align="center" color="textPrimary">
              Sizes
            </Typography>
            <div>
              {Object.entries(item.quantity).map(([size, quantity]) => (
                <Chip
                  key={size}
                  size="small"
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
              <Button
                color="primary"
                data-id={item.id}
                endIcon={<RemoveShoppingCartIcon />}
                onClick={handleRemove}
              >
                Remove from cart
              </Button>
              <Button
                color="primary"
                data-id={item.id}
                variant="outlined"
                endIcon={<PaymentIcon />}
                onClick={handleBuy}
              >
                buy now
              </Button>
            </div>
          )}
        </div>
      </Link>
      <div className={classes.actions}>
        <Button
          size="small"
          color="primary"
          data-id={item.id}
          endIcon={<RemoveShoppingCartIcon />}
          onClick={handleRemove}
        >
          Remove from cart
        </Button>
        <Button
          size="small"
          color="primary"
          data-id={item.id}
          variant="outlined"
          endIcon={<PaymentIcon />}
          onClick={handleBuy}
        >
          buy now
        </Button>
      </div>
    </Paper>
  )
}

export default MobileCartItem
