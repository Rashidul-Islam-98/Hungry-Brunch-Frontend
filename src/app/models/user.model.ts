export interface IUser {
    id?: string,
    fullName?: string,
    email?: string,
    image?: string,
    avatar?: string,
    userName?: string,
    phoneNumber?: string,
    lable?: string,
    firstName?: string,
    lastName?: string,
    middleName?: string,
    fatherName?: string,
    motherName?: string,
    spouseName?: string,
    dob?: string,
    joinDate?: string,
    designation?: string,
    address?: string,
    nid?: string,
    genderId?: number,
    gender?: string,
    role?: Role[]
}

export class Role {
    authority!: RoleType;
}

export type RoleType = 'ROLE_ADMIN' | 'ROLE_EMPLOYEE' | 'ROLE_CUSTOMER';