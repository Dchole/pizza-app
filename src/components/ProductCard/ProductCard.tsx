import Image from "next/image"
import ButtonBase from "@material-ui/core/ButtonBase"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import { GetPizzasQuery } from "@/graphql/generated"
import { useStyles } from "./useStyles"
import { cms } from "cms"

export interface IProductProps {
  pizza: GetPizzasQuery["pizzas"][0]
}

const loader = ({ src }: { src: string; width: number; quality: number }) =>
  `${cms}${src}`

const ProductCard: React.FC<IProductProps> = ({ pizza }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ButtonBase
        className={classes.buttonBase}
        TouchRippleProps={{
          classes: {
            child: classes.ripple,
            childPulsate: classes.childPulsate,
            rippleVisible: classes.rippleVisible
          }
        }}
        focusRipple
      >
        <Image
          loader={loader}
          src={pizza.image.formats.small.url}
          alt={pizza.name}
          objectFit="cover"
          width={300}
          height={240}
        />
        <div className="details">
          <Typography variant="h5" component="strong" align="center">
            {pizza.name}
          </Typography>
          <Typography
            variant="h6"
            component="span"
            align="center"
            color="textSecondary"
          >
            ₵ {pizza.price}
          </Typography>
        </div>
      </ButtonBase>
      <IconButton aria-label={`add ${pizza.name} to shopping cart`}>
        <AddShoppingCartIcon />
      </IconButton>
    </div>
  )
}

export default ProductCard
