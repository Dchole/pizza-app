import { GetCartPizzasQuery } from "@/graphql/generated"
import Db from "./init"

type TPizza = GetCartPizzasQuery["pizzas"][0]

export interface IPayload extends TPizza {
  quantity: number
}

class Cart extends Db {
  private collection = this.database.collection("launches")

  async getCart(): Promise<IPayload[]> {
    return this.collection.get()
  }

  async saveCart(payload: IPayload[]) {
    this.collection.set(payload)
  }

  async editCartItem(id: string, payload: Partial<IPayload>) {
    this.collection.doc({ id }).update(payload)
  }

  async clearCart() {
    this.collection.delete()
  }
}

export default Cart
