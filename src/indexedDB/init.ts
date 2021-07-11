import Localbase from "localbase"

class Db {
  private db: any

  constructor() {
    this.db = new Localbase("cart")
  }

  get database() {
    return this.db
  }
}

export default Db
