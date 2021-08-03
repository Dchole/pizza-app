import Head from "next/head"
import { capitalize } from "lodash"
import { deslugify } from "@/utils/deslugify"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { GraphQLClient } from "graphql-request"
import { cmsLinks } from "cms"
import { getSdk } from "@/graphql/generated"

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

export const getStaticProps: GetStaticProps<{ title: string }> = ({
  params
}) => {
  const title = deslugify(params.slug as string)
    .split(" ")
    .map(word => capitalize(word))
    .join(" ")

  return { props: { title } }
}

const CartDetail: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  title
}) => {
  return (
    <>
      <Head>
        <title>Shopping Cart | {title}</title>
      </Head>
    </>
  )
}

export default CartDetail
