import Image from "next/image"
import ButtonBase from "@material-ui/core/ButtonBase"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"
import Link from "../Link"
import { Maybe, CardFragment } from "@/graphql/generated"
import { loader } from "@/utils/imageLoader"
import { useCart } from "../CartContext"
import { useStyles } from "./useStyles"

export interface IProductProps {
  pizza: Maybe<{ __typename?: "Pizzas" } & CardFragment>
}

const ProductCard: React.FC<IProductProps> = ({ pizza }) => {
  const classes = useStyles()
  const { addItem, removeItem, isItemInCart } = useCart()

  return (
    <div className={classes.root}>
      <ButtonBase
        component={Link}
        href={`/pizza/${pizza?.slug}`}
        className={classes.buttonBase}
        TouchRippleProps={{
          classes: {
            child: classes.ripple,
            childPulsate: classes.childPulsate,
            rippleVisible: classes.rippleVisible
          }
        }}
        focusRipple
        naked
      >
        <Image
          loader={loader}
          src={pizza?.image?.formats.small.url}
          alt={pizza?.name}
          objectFit="cover"
          width={300}
          height={240}
        />
        <div className="details">
          <Typography variant="h5" component="strong" align="center">
            {pizza?.name}
          </Typography>
          <Typography
            variant="h6"
            component="span"
            align="center"
            color="textSecondary"
          >
            ₵ {pizza?.price_of_medium}
          </Typography>
        </div>
      </ButtonBase>
      <IconButton
        aria-label={`add ${pizza?.name} to shopping cart`}
        onClick={
          isItemInCart(pizza?.id || "") ? removeItem(pizza) : addItem(pizza)
        }
      >
        {isItemInCart(pizza?.id || "") ? (
          <RemoveShoppingCartIcon />
        ) : (
          <AddShoppingCartIcon />
        )}
      </IconButton>
    </div>
  )
}

export default ProductCard
