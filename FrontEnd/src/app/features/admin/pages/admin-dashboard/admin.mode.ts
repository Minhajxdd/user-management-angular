export interface userResponseData {
    _id: string,
    fullname: string,
    email: string,
    profileimage: string,
    role: string,
    isBlocked: boolean
}

export interface userEditData { 
    userId: string, 
    fullname: string, 
    email: string 
}