import { Role } from "./user.model";

export interface JwtPayload {
    role: Role[];
    id: string;
    sub: string;
    iat: number;
    exp: number;
}