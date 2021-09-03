import Image from "next/image"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import { useCart } from "@/components/CartContext"
import { loader } from "@/utils/imageLoader"
import PageLoader from "@/components/PageLoader"
import { useDesktopStyles } from "./styles/useDesktopStyles"
import FormSteps from "./CheckoutForm/FormSteps"

const Desktop = () => {
  const classes = useDesktopStyles()
  const { cart, getItemPrice, getItemQuantity, fetchingDetails } = useCart()

  return (
    <main className={classes.root}>
      <div className={classes.itemList}>
        {fetchingDetails ? (
          <PageLoader />
        ) : (
          cart.map(item => (
            <div key={item.pizza_id} className="item-details">
              <Image
                loader={loader}
                src={item.image.formats.thumbnail.url}
                alt={item.name}
                width={80}
                height={80}
                className={classes.image}
                objectFit="cover"
              />
              <div className="item-text">
                <div className="item-header">
                  <Typography variant="h5" component="p">
                    {item.name}
                  </Typography>
                  <Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      color="textSecondary"
                    >
                      ₵
                    </Typography>{" "}
                    {getItemPrice(item.pizza_id)}
                  </Typography>
                </div>
                <Typography color="textSecondary" variant="body2">
                  {getItemQuantity(item.pizza_id)} pcs
                </Typography>
              </div>
            </div>
          ))
        )}
      </div>
      <Divider orientation="vertical" className={classes.divider} light />
      <FormSteps />
    </main>
  )
}

export default Desktop
