declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_DB: string
    MONGODB_URI: string
    SECRET_COOKIE_PASSWORD: string
    NEXT_PUBLIC_GOOGLE_AUTH_API_KEY: string
    NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID: string
    NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET: string
    NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URL: string
  }
}
