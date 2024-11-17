export interface IAuthResponse {
    accessToken: string,
    refreshToken: string,
    forceChangePassword: boolean
}

export interface IRefreshTokenResponse {
    accessToken: string,
    refreshToken: string
}