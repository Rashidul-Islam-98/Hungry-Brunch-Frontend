export interface AuthResponse {
    token: string,
    user:  {
     id: string,
    fullName: string,
    email: string,
    image: string,
    userName: string,
    phoneNumber: string
    }
}