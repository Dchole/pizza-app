import Image from "next/image"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import PaymentIcon from "@material-ui/icons/Payment"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"
import {
  Enum_Pizzas_Size,
  GetPizzaDetailsQuery,
  getSdk
} from "@/graphql/generated"
import { cmsLinks } from "cms"
import { GraphQLClient } from "graphql-request"
import { GetStaticPaths, GetStaticProps } from "next"
import { loader } from "@/utils/imageLoader"
import { useCart } from "@/components/CartContext"
import useScreenSize from "@/hooks/usScreenSize"
import { useEffect, useState } from "react"
import usePayment from "@/hooks/usePayment"
import { useDetailPageStyles } from "styles/use-detail-page-styles"

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
  pizza: NonNullable<NonNullable<GetPizzaDetailsQuery["pizzas"]>[0]>
}

export const getStaticProps: GetStaticProps<IPizzaDetails> = async ({
  params
}) => {
  const client = new GraphQLClient(cmsLinks.api)
  const sdk = getSdk(client)
  const { pizzas } = await sdk.getPizzaDetails({
    filter: { slug: params?.slug as string }
  })

  if (!pizzas) throw new Error("Response shouldn't be undefined or null")

  const [pizza] = pizzas

  return { props: { pizza } }
}

const Pizza: React.FC<IPizzaDetails> = ({ pizza }) => {
  const classes = useDetailPageStyles()
  const desktop = useScreenSize()
  const { cart, getItemPrice, addItem, removeItem, isItemInCart } = useCart()
  const [price, setPrice] = useState(pizza.price_of_medium)
  const [size, setSize] = useState<Enum_Pizzas_Size>(Enum_Pizzas_Size["Medium"])
  const handleCheckout = usePayment(pizza.name, price)

  useEffect(() => {
    const item = cart.find(({ id }) => id === pizza.id)
    item && setSize(item.size)
  }, [cart, pizza])

  useEffect(() => {
    const priceAccordingToSize = getItemPrice(pizza.id)

    setPrice(priceAccordingToSize ?? pizza.price_of_medium)
  }, [cart, pizza, getItemPrice])

  return (
    <Container component="main" maxWidth="md" disableGutters={!desktop}>
      <div className={classes.imageWrapper}>
        <Image
          loader={loader}
          src={
            pizza.image?.formats.large?.url || pizza.image?.formats.medium.url
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
      {cart.some(({ id }) => id === pizza.id) && (
        <ButtonGroup
          color="secondary"
          aria-label="choose pizza size"
          className={classes.sizes}
          disableElevation
          data-id={pizza.id}
        >
          <Button variant={size === "small" ? "contained" : undefined}>
            Small
          </Button>
          <Button variant={size === "medium" ? "contained" : undefined}>
            Medium
          </Button>
          <Button variant={size === "large" ? "contained" : undefined}>
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
          onClick={() =>
            isItemInCart(pizza.id)
              ? removeItem(pizza.id)
              : addItem(pizza.id, pizza.size)
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
  )
}

export default Pizza
