export interface User {
    id: number;
    name: string;
    email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface Login {
    email: string;
    password: string;
}

export interface Register {
    name: string;
    email: string;
    password: string;
}