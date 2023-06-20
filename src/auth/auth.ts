export interface IAuthService {
    validateUser(email: string, passport: string): Promise<boolean>;
}