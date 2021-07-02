import Image from "next/image"
import Typography from "@material-ui/core/Typography"
import ButtonBase from "@material-ui/core/ButtonBase"
import Grid from "@material-ui/core/Grid"
import StoreIcon from "@material-ui/icons/Store"
import { GetPizzasQuery } from "@/graphql/generated"
import { cms } from "cms"
import { useStyles } from "./useStyles"
import Link from "../Link"
import ButtonLink from "../ButtonLink"

interface IPopularProps {
  pizzas: GetPizzasQuery["pizzas"]
}

const loader = ({ src }: { src: string; width: number; quality: number }) =>
  `${cms}${src}`

const Popular: React.FC<IPopularProps> = ({ pizzas }) => {
  const classes = useStyles()

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
