import Image from "next/image"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import PaymentIcon from "@material-ui/icons/Payment"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import PageBackdrop from "@/components/PageBackdrop"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { GetPizzaDetailsQuery, getSdk } from "@/graphql/generated"
import { cmsLinks } from "cms"
import { GraphQLClient } from "graphql-request"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { loader } from "@/utils/imageLoader"

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
    fallback: true
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

export const useStyles = makeStyles(
  createStyles({
    imageWrapper: { position: "relative", width: "100%", height: "60vh" },
    actions: { display: "flex", gap: 16 }
  })
)

const Pizza: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  pizza
}) => {
  const classes = useStyles()

  return (
    <PageBackdrop>
      <Container component="main" maxWidth="md">
        <div className={classes.imageWrapper}>
          <Image
            loader={loader}
            src={pizza.image.formats.large.url}
            alt={pizza.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <Typography variant="h3" component="h1">
          {pizza.name}
        </Typography>
        <Typography variant="h5" component="p">
          {pizza.price}
        </Typography>
        <Typography color="textSecondary">{pizza.description}</Typography>
        <div className={classes.actions}>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<PaymentIcon />}
          >
            Order Now
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            endIcon={<AddShoppingCartIcon />}
          >
            Add to Cart
          </Button>
        </div>
      </Container>
    </PageBackdrop>
  )
}

export default Pizza
