export function exclude<User, key extends keyof User>(user: User, keys: key[]): Omit<User, key> {
    for (let key of keys) {
        delete user[key]
    }
    return user
}
