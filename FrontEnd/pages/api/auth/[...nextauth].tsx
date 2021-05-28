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
  callbacks: {
    async signIn(user, account, profile) {
      // Add user to database if new. User dapr service perhaps.
      console.log("user:", user, "account:", account, "profile", profile)
      fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      }).then(
        response => response.json() // if the response is a JSON object
      ).then(
        success => {
          console.log(success)
        } // Handle the success response object
      ).catch(
        error => console.log(error) // Handle the error response object
      );
      return true
    },
    async redirect(url, baseUrl) {
      return baseUrl
    },
    async session(session, user) {
      return session
    },
    async jwt(token, user, account, profile, isNewUser) {
      return token
    }
  }
  // A database is optional, but required to persist accounts in a database
  //  database: process.env.DATABASE_URL,
})