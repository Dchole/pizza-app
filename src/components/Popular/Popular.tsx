import Image from "next/image"
import Typography from "@material-ui/core/Typography"
import ButtonBase from "@material-ui/core/ButtonBase"
import IconButton from "@material-ui/core/IconButton"
import Grid from "@material-ui/core/Grid"
import StoreIcon from "@material-ui/icons/Store"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import { GetPizzasQuery } from "@/graphql/generated"
import { cms } from "cms"
import { useStyles } from "./useStyles"
import ButtonLink from "../ButtonLink"

export interface IPizzaProps {
  pizzas: GetPizzasQuery["pizzas"]
}

const loader = ({ src }: { src: string; width: number; quality: number }) =>
  `${cms}${src}`

const Popular: React.FC<IPizzaProps> = ({ pizzas }) => {
  const classes = useStyles()

  const stopPropagation = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FocusEvent<HTMLButtonElement>
  ) => event.stopPropagation()

  return (
    <section className={classes.root}>
      <Typography variant="h2" align="center">
        Customer Favourites
      </Typography>
      <Typography variant="h6" component="p" align="center">
        Most purchased pizzas from our customers
      </Typography>
      <Grid justify="center" wrap="nowrap" className={classes.list} container>
        {pizzas.map(pizza => (
          <div key={pizza.id}>
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
              <IconButton
                aria-label={`add ${pizza.name} to shopping cart`}
                onFocus={stopPropagation}
                onMouseDown={stopPropagation}
              >
                <AddShoppingCartIcon />
              </IconButton>
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
                  {pizza.price}
                </Typography>
              </div>
            </ButtonBase>
          </div>
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
