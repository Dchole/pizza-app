import Head from "next/head"
import SingleItemDesktop from "@/components/Checkout/SingleItemDesktop"
import SingleItemMobile from "@/components/Checkout/SingleItemMobile"
import { GetPizzaDetailsQuery, getSdk } from "@/graphql/generated"
import { cmsLinks } from "@/cms"
import { GraphQLClient } from "graphql-request"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import useScreenSize from "@/hooks/usScreenSize"
import ConfirmationProvider from "@/components/Checkout/Context"
import { deNullify } from "@/utils/de-nullify"

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
  pizza: NonNullable<GetPizzaDetailsQuery["pizzas"]>[0]
}> = async ({ params }) => {
  const client = new GraphQLClient(cmsLinks.api)
  const sdk = getSdk(client)

  const { pizzas } = await sdk.getPizzaDetails({
    filter: { slug: params?.slug as string }
  })

  const [pizza] = deNullify(pizzas)

  return {
    props: {
      pizza
    }
  }
}

const initialSizes = {
  small: 0,
  medium: 0,
  large: 0
}

const CheckoutItem: React.FC<InferGetStaticPropsType<typeof getStaticProps>> =
  ({ pizza }) => {
    const desktop = useScreenSize()
    const { asPath } = useRouter()
    const [sizes, setSizes] = useState(initialSizes)

    const price = useMemo(() => {
      const params = new URLSearchParams(asPath.split("?")[1])
      const copiedSizes = { ...initialSizes }
      let amount = 0

      for (const [size, quantity] of params.entries()) {
        copiedSizes[size as "small" | "medium" | "large"] = Number(quantity)

        const price = `price_of_${size}` as
          | "price_of_small"
          | "price_of_medium"
          | "price_of_large"

        amount += (pizza?.[price] ?? 0) * Number(quantity)
      }

      setSizes(copiedSizes)
      return amount
    }, [asPath, pizza])

    return (
      <>
        <Head>
          <title>
            Checkout {pizza?.name} for ₵{price}
          </title>
        </Head>

        <ConfirmationProvider name={pizza?.name} price={price}>
          {desktop ? (
            <SingleItemDesktop pizza={pizza} sizes={sizes} price={price} />
          ) : (
            <SingleItemMobile pizza={pizza} price={price} />
          )}
        </ConfirmationProvider>
      </>
    )
  }

export default CheckoutItem
