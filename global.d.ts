interface IMongo {
  client: MongoClient
  db: Db
}

interface IMongoConfig {
  conn: IMongo
  promise: Promise<IMongo>
}

declare namespace NodeJS {
  interface Global {
    mongo: IMongoConfig
  }
}

interface CartDBWindow extends Window {
  db: CartDatabase
}

declare var window: CartDBWindow
