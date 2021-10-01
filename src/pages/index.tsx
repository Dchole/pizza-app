import Hero from "@/components/Hero"
import Brief from "@/components/Brief"
import Services from "@/components/Services"
import Reviews from "@/components/Reviews"
import Popular from "@/components/Popular"
import { GetStaticProps } from "next"
import { GraphQLClient } from "graphql-request"
import {
  GetPopularPizzasQuery,
  GetReviewsQuery,
  getSdk
} from "@/graphql/generated"
import { cmsLinks } from "@/cms"

export const getStaticProps: GetStaticProps<
  GetPopularPizzasQuery & GetReviewsQuery
> = async () => {
  const client = new GraphQLClient(cmsLinks.api)
  const sdk = getSdk(client)
  let [{ pizzas }, { reviews }] = await Promise.all([
    sdk.getPopularPizzas(),
    sdk.getReviews()
  ])

  return { props: { pizzas, reviews } }
}

interface IndexProps {
  pizzas: NonNullable<NonNullable<GetPopularPizzasQuery["pizzas"]>[0]>[]
  reviews: NonNullable<NonNullable<GetReviewsQuery["reviews"]>[0]>[]
}

const Home: React.FC<IndexProps> = ({ pizzas, reviews }) => {
  return (
    <>
      <main id="main-content" style={{ overflow: "hidden" }}>
        <Hero />
        <Brief />
        <Popular pizzas={pizzas} />
        <Services />
        <Reviews reviews={reviews} />
      </main>
    </>
  )
}

export default Home
