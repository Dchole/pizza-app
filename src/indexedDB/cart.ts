import { CardFragment } from "@/graphql/generated"
import Dexie from "dexie"

type TPizza = { __typename?: "Pizzas" } & CardFragment
export interface ICartTable extends TPizza {
  quantity: number
}

export default class CartDatabase extends Dexie {
  private cart: Dexie.Table<ICartTable, string>

  public constructor() {
    super("CartDatabase")
    this.version(1).stores({
      cart: "id,name,image,size,quantity"
    })

    this.cart = this.table("cart")
  }

  get getCart() {
    return this.cart
  }
}
