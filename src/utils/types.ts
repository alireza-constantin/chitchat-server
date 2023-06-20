export type createUser = {
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

export type FindUserDetail = Partial<{
    email: string,
    id: number
}>