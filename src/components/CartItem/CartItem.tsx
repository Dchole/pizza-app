import clsx from "clsx"
import Image from "next/image"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActionArea from "@material-ui/core/CardActionArea"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import { loader } from "@/utils/imageLoader"
import { useStyles } from "./useStyles"
import { ICartTable } from "@/indexedDB/cart"
import { useCart } from "../CartContext"

interface ICartItemProps {
  item: ICartTable
}

const CartItem: React.FC<ICartItemProps> = ({ item }) => {
  const classes = useStyles()
  const { increment, decrement } = useCart()

  return (
    <Card variant="outlined" className={classes.root}>
      <CardActionArea className={classes.actionArea}>
        <CardMedia className={classes.cover}>
          <Image
            loader={loader}
            src={item.image.formats.small.url}
            alt={item.name}
            title={item.name}
            layout="fill"
            objectFit="cover"
          />
        </CardMedia>
      </CardActionArea>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="p" variant="h5">
            {item.name}
          </Typography>
          <Typography color="textSecondary">{item.price}</Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton
            data-id={item.id}
            color="secondary"
            aria-label={`increment ${item.name} quantity`}
            className={clsx(classes.iconButton, classes.borderRight)}
            onClick={increment}
          >
            <AddIcon />
          </IconButton>
          <Typography component="span">{item.quantity}</Typography>
          <IconButton
            data-id={item.id}
            color="primary"
            aria-label={`decrement ${item.name} quantity`}
            className={clsx(classes.iconButton, classes.borderLeft)}
            onClick={decrement}
          >
            <RemoveIcon />
          </IconButton>
        </div>
      </div>
    </Card>
  )
}

export default CartItem
