import { GetStaticProps, InferGetStaticPropsType } from "next"
import Head from "next/head"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import Autocomplete from "@material-ui/lab/Autocomplete"
import PageBackdrop from "@/components/PageBackdrop"
import ProductCard from "@/components/ProductCard"
import { IPizzaProps } from "@/components/Popular"
import { GraphQLClient } from "graphql-request"
import { cms } from "cms"
import { getSdk } from "@/graphql/generated"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { usePizzaContext } from "@/components/PizzaContext"
import { useEffect, useState } from "react"
import useScreenSize from "@/hooks/usScreenSize"

const useStyles = makeStyles(theme =>
  createStyles({
    main: {
      display: "flex",
      flexWrap: "wrap",
      gap: "3vw",
      justifyContent: "center"
    },
    input: {
      margin: theme.spacing(0, 2, 4, 1),
      width: 300
    },
    inputFont: {
      fontFamily: theme.typography.h1.fontFamily
    },
    inputWrapper: {
      display: "flex",
      justifyContent: "flex-end"
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
  const { filteredPizzas, getAll, filter, reset } = usePizzaContext()
  const [value, setValue] = useState<typeof pizzas[0] | null>(null)
  const [inputValue, setInputValue] = useState("")
  const mobile = useScreenSize()

  useEffect(() => {
    getAll(pizzas)
  }, [pizzas, getAll])

  const handleInputValueChange = (_event: any, newInputValue: string) => {
    setInputValue(newInputValue)
  }

  const handleChange = (_event: any, newValue: typeof pizzas[0] | null) => {
    setValue(newValue)
    !newValue && reset()
  }

  const handleSelect = () => {
    value && filter([value])
  }

  return (
    <>
      <Head>
        <title>Store</title>
      </Head>

      <PageBackdrop>
        {!mobile && (
          <div className={classes.inputWrapper}>
            <Autocomplete
              id="search-pizza"
              value={value}
              inputValue={inputValue}
              onInputChange={handleInputValueChange}
              onChange={handleChange}
              options={pizzas}
              className={classes.input}
              getOptionLabel={option => option.name}
              classes={{ input: classes.inputFont, paper: classes.inputFont }}
              noOptionsText="No matching pizza"
              renderInput={({
                InputLabelProps,
                InputProps,
                inputProps,
                ...params
              }) => (
                <OutlinedInput
                  {...InputProps}
                  {...params}
                  placeholder="Search"
                  inputProps={{
                    ...inputProps,
                    "aria-label": "search pizza"
                  }}
                />
              )}
              onSelect={handleSelect}
              autoHighlight
            />
          </div>
        )}
        <main className={classes.main}>
          {[...(filteredPizzas.length > 0 ? filteredPizzas : pizzas)].map(
            pizza => (
              <ProductCard key={pizza?.id} pizza={pizza} />
            )
          )}
        </main>
      </PageBackdrop>
    </>
  )
}

export default Store
