import { useState, createContext, useContext, useCallback } from "react"
import { GetPizzasQuery } from "@/graphql/generated"

interface IPizzaContextProps extends GetPizzasQuery {
  allPizzas: GetPizzasQuery["pizzas"]
  filteredPizzas: GetPizzasQuery["pizzas"]
  getAll: (pizzas: GetPizzasQuery["pizzas"]) => void
  filter: (pizzas: GetPizzasQuery["pizzas"]) => void
  reset: () => void
}

const PizzaContext = createContext({} as IPizzaContextProps)

const PizzaContextProvider: React.FC = ({ children }) => {
  const [allPizzas, setAllPizzas] = useState<GetPizzasQuery["pizzas"]>([])
  const [filteredPizzas, setFilteredPizzas] = useState<
    GetPizzasQuery["pizzas"]
  >([])

  const getAll = useCallback(
    (pizzas: GetPizzasQuery["pizzas"]) => setAllPizzas(pizzas),
    []
  )
  const filter = useCallback(
    (pizzas: GetPizzasQuery["pizzas"]) => setFilteredPizzas(pizzas),
    []
  )

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
