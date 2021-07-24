import Hero from "@/components/Hero"
import Brief from "@/components/Brief"
import Services from "@/components/Services"
import Reviews from "@/components/Reviews"
import Popular from "@/components/Popular"
import { GetStaticProps } from "next"
import { GraphQLClient } from "graphql-request"
import { GetPopularPizzasQuery, getSdk } from "@/graphql/generated"
import { cmsLinks } from "cms"

export const getStaticProps: GetStaticProps<GetPopularPizzasQuery> =
  async () => {
    const client = new GraphQLClient(cmsLinks.api)
    const sdk = getSdk(client)
    let { pizzas } = await sdk.getPopularPizzas()

    return { props: { pizzas } }
  }

interface IndexProps {
  pizzas: NonNullable<NonNullable<GetPopularPizzasQuery["pizzas"]>[0]>[]
}

const Home: React.FC<IndexProps> = ({ pizzas }) => {
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
