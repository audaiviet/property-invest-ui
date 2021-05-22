export interface IUser {
    userId: string, // unique id at id provider (sub field for okta-id field in nextauth)
    fullName: string,
    firstName: string,
    lastName: string,
    userName: string,
    email: string
}