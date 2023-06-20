import * as bcrypt from 'bcrypt'

export function exclude<User, key extends keyof User>(user: User, keys: key[]): Omit<User, key> {
    for (let key of keys) {
        delete user[key]
    }
    return user
}

export async function hashText(text: string): Promise<string> {
        const salt = await bcrypt.genSalt()
        return bcrypt.hash(text, salt)
}

export function compareHashText(text: string, hash: string) {
    return bcrypt.compare(text, hash)
}