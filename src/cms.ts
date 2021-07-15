export const cmsLinks = {
  hostname:
    process.env.NODE_ENV === "production"
      ? "https://moshood-pizza.herokuapp.com" // Strapi production host
      : "http://localhost:1337", // Strapi development or local host
  get api() {
    return this.hostname + "/graphql" // Strapi GraphQL endpoint
  }
}
