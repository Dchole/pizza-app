declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_DB: string
    MONGODB_URI: string
    JWT_SECRET: string
    NEXMO_API_KEY: string
    NEXMO_API_SECRET: string
    NEXMO_APPLICATION_ID: string
    NEXMO_PUBLIC_KEY: string
    NEXMO_PRIVATE_KEY: string
    SECRET_COOKIE_PASSWORD: string
    NEXT_PUBLIC_GOOGLE_AUTH_API_KEY: string
    NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID: string
    NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET: string
    NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URL: string
    NEXT_PUBLIC_PAYSTACK_PUBLIC: string
    NEXT_PUBLIC_PAYSTACK_SECRET: string
  }
}
