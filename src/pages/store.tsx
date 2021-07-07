import { GetStaticProps, InferGetStaticPropsType } from "next"
import Head from "next/head"
import PageBackdrop from "@/components/PageBackdrop"
import ProductCard from "@/components/ProductCard"
import { IPizzaProps } from "@/components/Popular"
import { GraphQLClient } from "graphql-request"
import { cms } from "cms"
import { getSdk } from "@/graphql/generated"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { usePizzaContext } from "@/components/PizzaContext"
import { useEffect } from "react"

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
  const { filteredPizzas, getAll } = usePizzaContext()

  useEffect(() => {
    getAll(pizzas)
  }, [pizzas, getAll])

  return (
    <>
      <Head>
        <title>Store</title>
      </Head>

      <PageBackdrop>
        <main className={classes.main}>
          {[...(filteredPizzas.length > 0 ? filteredPizzas : pizzas)]?.map(
            pizza => (
              <ProductCard key={pizza.id} pizza={pizza} />
            )
          )}
        </main>
      </PageBackdrop>
    </>
  )
}

export default Store
