import Hero from "@/components/Hero"
import Brief from "@/components/Brief"
import Services from "@/components/Services"
import Reviews from "@/components/Reviews"
import Popular, { IPizzaProps } from "@/components/Popular"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { GraphQLClient } from "graphql-request"
import { getSdk } from "@/graphql/generated"
import { cms } from "cms"

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
    <>
      <main id="main-content">
        <Hero />
        <Brief />
        <Popular pizzas={pizzas} />
        <Services />
        <Reviews />
      </main>
    </>
  )
}

export default Home
