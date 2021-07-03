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
