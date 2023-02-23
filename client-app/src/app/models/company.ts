export interface Company {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    passwordSalt: string;
    status: number;
    createDate: string;
    updateDate: string;
}