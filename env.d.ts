declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_DB: string
    MONGODB_URI: string
    SECRET_COOKIE_PASSWORD: string
    GOOGLE_AUTH_CLIENT_ID: string
    GOOGLE_AUTH_CLIENT_SECRET: string
    GOOGLE_AUTH_REDIRECT_URL: string
  }
}
