import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
      Providers.Okta({
        clientId: process.env.OKTA_CLIENT_ID,
        clientSecret: process.env.OKTA_CLIENT_SECRET,
        domain: process.env.OKTA_DOMAIN
      })
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
//  database: process.env.DATABASE_URL,
})