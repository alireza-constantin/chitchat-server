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

export type CreateConversationsParams = {
    authorId: number,
    recipientId: number,
    message: string
}