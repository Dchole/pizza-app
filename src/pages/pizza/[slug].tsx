import Image from "next/image"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import MenuItem from "@material-ui/core/MenuItem"
import Typography from "@material-ui/core/Typography"
import Select from "@material-ui/core/Select"
import PaymentIcon from "@material-ui/icons/Payment"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"
import { capitalize } from "lodash"
import { GetPizzaDetailsQuery, getSdk } from "@/graphql/generated"
import { cmsLinks } from "@/cms"
import { GraphQLClient } from "graphql-request"
import { GetStaticPaths, GetStaticProps } from "next"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { loader } from "@/utils/imageLoader"
import { useCart } from "@/components/CartContext"
import { useState } from "react"
import useScreenSize from "@/hooks/usScreenSize"
import ButtonLink from "@/components/ButtonLink"
import { deNullify } from "@/utils/de-nullify"

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      gap: 24,
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",

      [theme.breakpoints.up("sm")]: {
        gap: 48,
        flexWrap: "nowrap"
      }
    },
    imageWrapper: {
      height: 300,
      width: "100%",
      position: "relative",

      [theme.breakpoints.up("sm")]: {
        width: 300
      }
    },
    description: {
      width: "100%",
      maxWidth: 450,
      margin: theme.spacing(2, 0)
    },
    select: {
      margin: theme.spacing(2, 0),

      "& h2": {
        marginBottom: 8
      }
    },
    inputWrapper: {
      display: "flex",
      justifyContent: "center",

      [theme.breakpoints.up("sm")]: {
        justifyContent: "flex-start"
      }
    },
    input: {
      width: 183,

      [theme.breakpoints.up("lg")]: {
        width: 206
      }
    },
    actions: {
      display: "flex",
      gap: 16,
      justifyContent: "space-between",

      "& .MuiButton-root": {
        width: "fit"
      },

      "@media(max-width: 320px)": {
        gap: 8
      },

      [theme.breakpoints.up("sm")]: {
        "& .MuiButton-root": {
          width: "initial"
        }
      }
    }
  })
)

export const getStaticPaths: GetStaticPaths = async () => {
  const client = new GraphQLClient(cmsLinks.api)
  const sdk = getSdk(client)
  const { pizzas } = await sdk.getPizzas()

  return {
    paths: pizzas!.map(pizza => ({
      params: {
        slug: String(pizza?.slug)
      }
    })),
    fallback: false
  }
}
interface IPizzaDetails {
  pizza: NonNullable<GetPizzaDetailsQuery["pizzas"]>[0]
}

export const getStaticProps: GetStaticProps<IPizzaDetails> = async ({
  params
}) => {
  const client = new GraphQLClient(cmsLinks.api)
  const sdk = getSdk(client)
  const { pizzas } = await sdk.getPizzaDetails({
    filter: { slug: params?.slug as string }
  })

  const [pizza] = deNullify(pizzas, "Response shouldn't be undefined or null")
  return { props: { pizza } }
}

type TPrice = "price_of_small" | "price_of_medium" | "price_of_large"

const Pizza: React.FC<IPizzaDetails> = ({ pizza }) => {
  const classes = useStyles()
  const desktop = useScreenSize()
  const [size, setSize] = useState("medium")
  const { addItem, removeItem, isItemInCart } = useCart()

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSize(event.target.value as string)
  }

  const handleAddItem = () => {
    try {
      const item = deNullify(pizza)
      isItemInCart(item.id) ? removeItem(item.id) : addItem(item.id, size)
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  return (
    <Container
      component="main"
      maxWidth="md"
      className={classes.root}
      disableGutters={!desktop}
    >
      <div className={classes.imageWrapper}>
        <Image
          loader={loader}
          src={pizza?.image?.formats.medium.url}
          alt={pizza?.name}
          width={desktop ? 300 : undefined}
          height={desktop ? 300 : undefined}
          layout={desktop ? undefined : "fill"}
          objectFit="cover"
        />
      </div>
      <div>
        <Typography
          variant="h3"
          component="h1"
          align={desktop ? "left" : "center"}
        >
          {pizza?.name}
        </Typography>
        <Typography
          color="textSecondary"
          className={classes.description}
          align={desktop ? "left" : "center"}
        >
          {pizza?.description}
        </Typography>
        <div className={classes.select}>
          <Typography
            variant="h5"
            component="h2"
            align={desktop ? "left" : "center"}
          >
            <span id="select-title">Choose Size</span> &mdash;{" "}
            <Typography
              color="textSecondary"
              variant="h5"
              component="span"
              aria-label={`${pizza?.[`price_of_${size}` as TPrice]} cedis`}
            >
              <small>₵</small>
              {pizza?.[`price_of_${size}` as TPrice]}
            </Typography>
          </Typography>
          <div className={classes.inputWrapper}>
            <Select
              id="select-pizza-size"
              value={size}
              margin="dense"
              variant="outlined"
              onChange={handleChange}
              className={classes.input}
              inputProps={{ "aria-labelledby": "select-title" }}
            >
              {["small", "medium", "large"].map(size => (
                <MenuItem key={size} value={size}>
                  {capitalize(size)}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <div className={classes.actions}>
          <Button
            variant="outlined"
            color="primary"
            size={desktop ? undefined : "small"}
            endIcon={
              pizza && isItemInCart(pizza.id) ? (
                <RemoveShoppingCartIcon />
              ) : (
                <AddShoppingCartIcon />
              )
            }
            onClick={handleAddItem}
          >
            {pizza && isItemInCart(pizza.id)
              ? "Remove from Cart"
              : "Add to Cart"}
          </Button>
          <ButtonLink
            href={{
              pathname: `/checkout/${pizza?.slug}`,
              query: { [size]: 1 }
            }}
            size={desktop ? undefined : "small"}
            variant="contained"
            color="primary"
            endIcon={<PaymentIcon />}
          >
            Order Now
          </ButtonLink>
        </div>
      </div>
    </Container>
  )
}

export default Pizza
