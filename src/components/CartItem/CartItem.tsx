import Image from "next/image"
import dynamic from "next/dynamic"
import { capitalize } from "lodash"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import ButtonBase from "@material-ui/core/ButtonBase"
import Chip from "@material-ui/core/Chip"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import CardActionArea from "@material-ui/core/CardActionArea"
import Typography from "@material-ui/core/Typography"
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"
import PaymentIcon from "@material-ui/icons/Payment"
import Link from "../Link"
import { loader } from "@/utils/imageLoader"
import { useStyles } from "./useStyles"
import { useCart, TCartItemDetails } from "../CartContext"
import useScreenSize from "@/hooks/usScreenSize"
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple"
import { useRef } from "react"

const PaymentMethodDialog = dynamic(
  () => import("@/components/PaymentMethod/Dialog")
)
const PaymentMethodSheet = dynamic(
  () => import("@/components/PaymentMethod/Sheet")
)

interface ICartItemProps {
  item: TCartItemDetails
  handleSelect: (id: string) => void
}

interface IRef {
  start: (event: React.MouseEvent<HTMLDivElement>) => void
  stop: (event: React.MouseEvent<HTMLDivElement>) => void
}

const CartItem: React.FC<ICartItemProps> = ({ item, handleSelect }) => {
  const rippleRef = useRef<IRef>(null)
  const classes = useStyles()
  const desktop = useScreenSize()
  const { removeItem, getItemPrice, getItemQuantity } = useCart()

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    removeItem(item.id)
    event.stopPropagation()
  }

  const handleBuy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
  }

  const handleRippleStop = (event: React.MouseEvent<HTMLDivElement>) => {
    rippleRef.current.stop(event)
  }

  const handleRippleStart = (event: React.MouseEvent<HTMLDivElement>) => {
    rippleRef.current.start(event)
  }

  const handleCardClick = () => {
    handleSelect(item.id)
  }

  return (
    <Card
      tabIndex={0}
      // @ts-ignore
      onClick={desktop ? handleCardClick : undefined}
      variant="outlined"
      role="button"
      onMouseUp={handleRippleStop}
      onMouseDown={handleRippleStart}
      className={classes.root}
    >
      {desktop && <TouchRipple ref={rippleRef} />}
      <CardActionArea
        component={desktop ? undefined : Link}
        href={desktop ? undefined : `/cart/${item.slug}`}
        className={classes.actionArea}
        tabIndex={desktop ? -1 : undefined}
        disableRipple={desktop}
      >
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
          <Typography
            color="textPrimary"
            component={desktop ? "p" : Link}
            variant="h3"
            href={desktop ? undefined : `/cart/${item.slug}`}
          >
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
      </CardContent>
      {!desktop && (
        <CardActions className={classes.actions}>
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
        </CardActions>
      )}
    </Card>
  )
}

export default CartItem
