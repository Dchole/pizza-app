export const init = () => {
  gapi.client.init({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID,
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_AUTH_API_KEY,
    scope: "profile"
  })
}
