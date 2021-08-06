import Head from "next/head"
import Image from "next/image"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import PaymentIcon from "@material-ui/icons/Payment"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"
import { capitalize } from "lodash"
import { deslugify } from "@/utils/deslugify"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { GraphQLClient } from "graphql-request"
import { cmsLinks } from "cms"
import { GetPizzaDetailsQuery, getSdk } from "@/graphql/generated"
import { loader } from "@/utils/imageLoader"
import useScreenSize from "@/hooks/usScreenSize"
import { useDetailPageStyles } from "styles/use-detail-page-styles"
import { useCart } from "@/components/CartContext"

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

export const getStaticProps: GetStaticProps<{
  title: string
  pizza: GetPizzaDetailsQuery["pizzas"][0]
}> = async ({ params }) => {
  const title = deslugify(params.slug as string)
    .split(" ")
    .map(word => capitalize(word))
    .join(" ")

  const client = new GraphQLClient(cmsLinks.api)
  const sdk = getSdk(client)
  const {
    pizzas: [pizza]
  } = await sdk.getPizzaDetails({
    filter: { slug: params?.slug as string }
  })

  return { props: { title, pizza } }
}

const CartDetail: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  title,
  pizza
}) => {
  console.log(pizza)
  const classes = useDetailPageStyles()
  const desktop = useScreenSize()
  const { cart, getItemPrice, addItem, removeItem, isItemInCart } = useCart()

  return (
    <>
      <Head>
        <title>Shopping Cart | {title}</title>
      </Head>

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
            <span>{pizza && getItemPrice(pizza.id)}</span>
          </Typography>
        </div>

        <div className={classes.actions}>
          <Button
            size={desktop ? "medium" : "small"}
            color="primary"
            variant="outlined"
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
            size={desktop ? "medium" : "small"}
            variant="contained"
            color="primary"
            endIcon={<PaymentIcon />}
          >
            Buy Now
          </Button>
        </div>
      </Container>
    </>
  )
}

export default CartDetail
