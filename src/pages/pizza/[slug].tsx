import Image from "next/image"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import PaymentIcon from "@material-ui/icons/Payment"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"
import PageBackdrop from "@/components/PageBackdrop"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import {
  Enum_Pizzas_Size,
  GetPizzaDetailsQuery,
  getSdk
} from "@/graphql/generated"
import { cmsLinks } from "cms"
import { GraphQLClient } from "graphql-request"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { loader } from "@/utils/imageLoader"
import { useCart } from "@/components/CartContext"
import useScreenSize from "@/hooks/usScreenSize"
import { useEffect, useState } from "react"
import usePayment from "@/hooks/usePayment"

export const getStaticPaths: GetStaticPaths = async () => {
  const client = new GraphQLClient(cmsLinks.api)
  const sdk = getSdk(client)
  const { pizzas } = await sdk.getPizzas()

  return {
    paths: pizzas.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: false
  }
}

interface IPizzaDetails {
  pizza: GetPizzaDetailsQuery["pizzas"][0]
}

export const getStaticProps: GetStaticProps<IPizzaDetails> = async ({
  params
}) => {
  const client = new GraphQLClient(cmsLinks.api)
  const sdk = getSdk(client)
  const {
    pizzas: [pizza]
  } = await sdk.getPizzaDetails({
    filter: { slug: params.slug as string }
  })

  return { props: { pizza } }
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      "& h1": {
        margin: theme.spacing(1, 0, 2)
      }
    },
    headerText: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    description: {
      width: "100%",
      maxWidth: 450,
      margin: theme.spacing(2, 0)
    },
    imageWrapper: {
      position: "relative",
      width: "100%",
      height: "40vh",
      marginBottom: 16,

      [theme.breakpoints.up("sm")]: {
        height: "60vh"
      }
    },
    actions: {
      display: "flex",
      gap: 16,
      justifyContent: "flex-end",
      flexWrap: "wrap",

      "& .MuiButton-root": {
        width: "100%"
      },

      "@media(max-width: 320px)": {
        gap: 8
      },

      [theme.breakpoints.up("sm")]: {
        flexWrap: "nowrap",

        "& .MuiButton-root": {
          width: "initial"
        }
      }
    },
    sizes: {
      display: "flex",
      margin: theme.spacing(2, "auto"),
      justifyContent: "center",

      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(5, "auto")
      }
    }
  })
)

const Pizza: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  pizza
}) => {
  const classes = useStyles()
  const desktop = useScreenSize()
  const {
    cart,
    cartItems,
    getItemPrice,
    addItem,
    removeItem,
    selectSize,
    isItemInCart
  } = useCart()
  const [price, setPrice] = useState(pizza.price_of_medium)
  const [size, setSize] = useState<Enum_Pizzas_Size>(Enum_Pizzas_Size["Medium"])
  const handleCheckout = usePayment(price)

  useEffect(() => {
    const item = cart.find(({ id }) => id === pizza.id)
    item && setSize(item.size)
  }, [cart, pizza])

  useEffect(() => {
    const priceAccordingToSize = getItemPrice(
      cartItems.find(({ id }) => pizza.id === id)
    )

    setPrice(priceAccordingToSize ?? pizza.price_of_medium)
  }, [cartItems, pizza, getItemPrice])

  return (
    <PageBackdrop>
      <Container component="main" maxWidth="md" disableGutters={!desktop}>
        <div className={classes.imageWrapper}>
          <Image
            loader={loader}
            src={
              pizza.image.formats.large?.url || pizza.image.formats.medium.url
            }
            alt={pizza.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={classes.headerText}>
          <Typography variant="h3" component="h1">
            {pizza.name}
          </Typography>
          <Typography variant="h5" component="p">
            <span>₵</span>&nbsp;
            <span>{price}</span>
          </Typography>
        </div>
        <Typography color="textSecondary" className={classes.description}>
          {pizza.description}
        </Typography>
        {cartItems.some(({ id }) => id === pizza.id) && (
          <ButtonGroup
            color="secondary"
            aria-label="choose pizza size"
            className={classes.sizes}
            disableElevation
            data-id={pizza.id}
          >
            <Button
              variant={size === "small" ? "contained" : undefined}
              onClick={selectSize}
            >
              Small
            </Button>
            <Button
              variant={size === "medium" ? "contained" : undefined}
              onClick={selectSize}
            >
              Medium
            </Button>
            <Button
              variant={size === "large" ? "contained" : undefined}
              onClick={selectSize}
            >
              Large
            </Button>
          </ButtonGroup>
        )}
        <div className={classes.actions}>
          <Button
            variant="outlined"
            color="primary"
            endIcon={
              isItemInCart(pizza.id) ? (
                <RemoveShoppingCartIcon />
              ) : (
                <AddShoppingCartIcon />
              )
            }
            onClick={
              isItemInCart(pizza.id) ? removeItem(pizza) : addItem(pizza)
            }
          >
            {isItemInCart(pizza.id) ? "Remove from Cart" : "Add to Cart"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={<PaymentIcon />}
            onClick={handleCheckout}
          >
            Order Now
          </Button>
        </div>
      </Container>
    </PageBackdrop>
  )
}

export default Pizza
