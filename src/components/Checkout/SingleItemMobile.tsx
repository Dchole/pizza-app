import { GetPizzasQuery } from "@/graphql/generated"
import { useMobileStyles } from "./styles/useMobileStyles"
import Avatar from "@material-ui/core/Avatar"
import AvatarGroup from "@material-ui/lab/AvatarGroup"
import Typography from "@material-ui/core/Typography"
import MobileForm from "./CheckoutForm/MobileForm"

interface IProps {
  pizza: GetPizzasQuery["pizzas"][0]
  price: number
}

const SingleItemMobile: React.FC<IProps> = ({ pizza, price }) => {
  const classes = useMobileStyles()

  return (
    <>
      <main>
        <div className={classes.header}>
          <div className="header-title">
            <AvatarGroup max={3}>
              <Avatar
                variant="rounded"
                key={pizza.id}
                alt={pizza.name}
                src={pizza.image.formats?.thumbnail.url}
                className={classes.avatar}
              />
            </AvatarGroup>
            <Typography variant="h6" component="p">
              {pizza.name}
            </Typography>
          </div>
          <Typography className={classes.price}>
            <small>₵</small>
            {price}
          </Typography>
        </div>
        <MobileForm />
      </main>
    </>
  )
}

export default SingleItemMobile
