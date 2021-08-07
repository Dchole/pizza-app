import Head from "next/head"
import Image from "next/image"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import { capitalize } from "lodash"
import { deslugify } from "@/utils/deslugify"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { GraphQLClient } from "graphql-request"
import { cmsLinks } from "cms"
import { GetPizzaDetailsQuery, getSdk } from "@/graphql/generated"
import { loader } from "@/utils/imageLoader"
import useScreenSize from "@/hooks/usScreenSize"
import { useCart } from "@/components/CartContext"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import CartControls from "@/components/SelectedCartItem/CartControls"
import { useMemo } from "react"

const useStyles = makeStyles(theme =>
  createStyles({
    heading: {
      display: "flex",
      gap: 16,
      marginBottom: 24,

      "& > div": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly"
      }
    },
    image: {
      borderRadius: 10
    },
    actions: {
      display: "flex"
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
  const classes = useStyles()
  const desktop = useScreenSize()
  const { cart, getItemPrice } = useCart()
  const item = useMemo(() => cart.find(i => i.id === pizza.id), [pizza, cart])

  return (
    <>
      <Head>
        <title>Shopping Cart | {title}</title>
      </Head>

      <Container component="main" maxWidth="md" disableGutters={!desktop}>
        <div className={classes.heading}>
          <Image
            loader={loader}
            src={
              pizza.image?.formats.large?.url || pizza.image?.formats.medium.url
            }
            alt={pizza.name}
            width={80}
            height={80}
            className={classes.image}
            objectFit="cover"
          />
          <div>
            <Typography variant="h3" component="h1">
              {pizza.name}
            </Typography>
            <Typography variant="h5" component="p">
              <span>₵</span>&nbsp;
              <span>{pizza && getItemPrice(pizza.id)}</span>
            </Typography>
          </div>
        </div>
        {item && <CartControls item={item} />}
      </Container>
    </>
  )
}

export default CartDetail
