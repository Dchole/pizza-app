export const cmsLinks = {
  hostname:
    process.env.NODE_ENV === "production"
      ? "http://localhost:1337" // For now
      : "http://localhost:1337", // Strapi endpoint
  get api() {
    return this.hostname + "/graphql"
  }
}
