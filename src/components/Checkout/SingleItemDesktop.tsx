import Image from "next/image"
import Avatar from "@material-ui/core/Avatar"
import Chip from "@material-ui/core/Chip"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import { loader } from "@/utils/imageLoader"
import { GetPizzasQuery } from "@/graphql/generated"
import { useDesktopStyles } from "./styles/useDesktopStyles"
import FormSteps from "./CheckoutForm/FormSteps"
import { capitalize } from "@material-ui/core"

interface IProps {
  sizes: {
    small?: number
    medium?: number
    large?: number
  }
  pizza: GetPizzasQuery["pizzas"][0]
  price: number
}

const SingleItemDesktop: React.FC<IProps> = ({ sizes, pizza, price }) => {
  const classes = useDesktopStyles()

  return (
    <main className={classes.root}>
      <div className={classes.item}>
        <div className={classes.imageWrapper}>
          <Image
            loader={loader}
            src={pizza.image.formats.medium.url}
            alt={pizza.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={classes.itemText}>
          <Typography variant="h5" component="p" align="center">
            {pizza.name}
          </Typography>
          <Typography>
            <Typography variant="body2" component="span" color="textSecondary">
              ₵
            </Typography>{" "}
            {price}
          </Typography>
        </div>
        <div className={classes.quantity}>
          {Object.entries(sizes).map(([size, quantity]) => (
            <Chip
              key={size}
              label={capitalize(size)}
              avatar={<Avatar>{quantity}</Avatar>}
              title={`${quantity} ${size} ${quantity === 1 ? "size" : "sizes"}`}
            />
          ))}
        </div>
      </div>
      <Divider orientation="vertical" className={classes.divider} light />
      <FormSteps />
    </main>
  )
}

export default SingleItemDesktop
