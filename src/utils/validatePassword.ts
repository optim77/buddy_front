import {isValidPassword} from "./isValidPassword";

export interface PasswordValidationResult {
    valid: boolean;
    message?: string;
}

export const validatePassword = (password: string, confirmPassword: string): PasswordValidationResult => {

    if (password !== confirmPassword) {
        return {valid: false, message: "Passwords do not match"};
    }

    if (password.length < 8){
        return {valid: false, message: "Password must be at least 6 characters long."};
    }
    if (isValidPassword(password)) {
        return {valid: false, message: "Password does not meet the requirements (8–32 characters, upper and lower case, special character)"};
    }
    return { valid: true };
}