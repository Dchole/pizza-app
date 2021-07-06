import Image from "next/image"
import Typography from "@material-ui/core/Typography"
import ButtonBase from "@material-ui/core/ButtonBase"
import IconButton from "@material-ui/core/IconButton"
import Grid from "@material-ui/core/Grid"
import StoreIcon from "@material-ui/icons/Store"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import ProductCard from "../ProductCard"
import { GetPizzasQuery } from "@/graphql/generated"
import { useStyles } from "./useStyles"
import ButtonLink from "../ButtonLink"

export interface IPizzaProps {
  pizzas: GetPizzasQuery["pizzas"]
}

const Popular: React.FC<IPizzaProps> = ({ pizzas }) => {
  const classes = useStyles()

  return (
    <section id="popular" className={classes.root}>
      <div className={classes.text}>
        <Typography variant="h2" align="center">
          Customers&apos; Favourites
        </Typography>
        <Typography variant="h6" component="p" align="center">
          Most purchased pizzas from our customers
        </Typography>
      </div>
      <Grid wrap="nowrap" className={classes.list} container>
        {pizzas.map(pizza => (
          <ProductCard key={pizza.id} pizza={pizza} />
        ))}
      </Grid>
      <div className={classes.buttonWrapper}>
        <ButtonLink
          href="/store"
          variant="contained"
          color="primary"
          endIcon={<StoreIcon />}
        >
          Go to our store
        </ButtonLink>
      </div>
    </section>
  )
}

export default Popular
