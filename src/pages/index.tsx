import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Brief from "@/components/Brief"
import Popular from "@/components/Popular"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { GraphQLClient } from "graphql-request"
import { getSdk, GetPizzasQuery } from "@/graphql/generated"
import { cms } from "cms"

interface IPizzaProps {
  pizzas: GetPizzasQuery["pizzas"]
}

export const getStaticProps: GetStaticProps<IPizzaProps> = async () => {
  const client = new GraphQLClient(`${cms}/graphql`)
  const sdk = getSdk(client)
  const { pizzas } = await sdk.getPizzas()

  return { props: { pizzas } }
}

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  pizzas
}) => {
  return (
    <div>
      <Header />
      <Hero />
      <Brief />
      <Popular pizzas={pizzas} />
    </div>
  )
}

export default Home
