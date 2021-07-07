import { GetStaticProps, InferGetStaticPropsType } from "next"
import Head from "next/head"
import PageBackdrop from "@/components/PageBackdrop"
import ProductCard from "@/components/ProductCard"
import { IPizzaProps } from "@/components/Popular"
import { GraphQLClient } from "graphql-request"
import { cms } from "cms"
import { getSdk } from "@/graphql/generated"
import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(
  createStyles({
    main: {
      display: "flex",
      flexWrap: "wrap",
      gap: "3vw",
      justifyContent: "center"
    }
  })
)

export const getStaticProps: GetStaticProps<IPizzaProps> = async () => {
  const client = new GraphQLClient(`${cms}/graphql`)
  const sdk = getSdk(client)
  const { pizzas } = await sdk.getPizzas()

  return { props: { pizzas } }
}

const Store: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  pizzas
}) => {
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>Store</title>
      </Head>

      <PageBackdrop pizzas={pizzas}>
        <main className={classes.main}>
          {pizzas?.map(pizza => (
            <ProductCard key={pizza.id} pizza={pizza} />
          ))}
        </main>
      </PageBackdrop>
    </>
  )
}

export default Store
