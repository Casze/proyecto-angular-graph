export interface User {
    id: number;
    name?: string;
}

export interface LoginResponse {
    access_token: string;
    user: User;
}