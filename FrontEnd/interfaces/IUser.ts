export interface IUser {
    authId: string, // unique id at id provider (sub field for okta-id field in nextauth)
    userId: string, // id in our system (guid string), not database record id
    fullName: string,
    firstName: string,
    lastName: string,
    userName: string,
    email: string
}