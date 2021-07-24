import { useState, createContext, useContext, useCallback } from "react"
import { GetPizzasQuery } from "@/graphql/generated"

export type TPizzas = NonNullable<NonNullable<GetPizzasQuery["pizzas"]>[0]>[]

interface IPizzaContextProps extends GetPizzasQuery {
  allPizzas: TPizzas
  filteredPizzas: TPizzas
  getAll: (pizzas: TPizzas) => void
  filter: (pizzas: TPizzas) => void
  reset: () => void
}

const PizzaContext = createContext({} as IPizzaContextProps)

const PizzaContextProvider: React.FC = ({ children }) => {
  const [allPizzas, setAllPizzas] = useState<TPizzas>([])
  const [filteredPizzas, setFilteredPizzas] = useState<TPizzas>([])

  const getAll = useCallback((pizzas: TPizzas) => setAllPizzas(pizzas), [])
  const filter = useCallback((pizzas: TPizzas) => setFilteredPizzas(pizzas), [])

  const reset = useCallback(() => setFilteredPizzas([]), [])

  return (
    <PizzaContext.Provider
      value={{ allPizzas, filteredPizzas, getAll, filter, reset }}
    >
      {children}
    </PizzaContext.Provider>
  )
}

export const usePizzaContext = (): IPizzaContextProps => {
  return useContext(PizzaContext)
}

export default PizzaContextProvider
