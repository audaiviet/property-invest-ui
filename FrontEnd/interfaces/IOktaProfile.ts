export interface IOktaProfile {
    sub: string, // Unique okta user id
    name: string, // Full name
    locale: string, //e.g. 'en-US'
    email: string, // email
    preferred_username: string, // email
    given_name: string, // First name
    family_name: string, // Last name
    zoneinfo: string, // e.g. 'America/Los_Angeles'
    updated_at: number, // Epoch datetime
    email_verified: boolean
}