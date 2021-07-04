declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string
    MONGODB_DB: string
    SECRET_COOKIE_PASSWORD: string
  }
}
