export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface OMDBResponse {
    Search?: Movie[];
    totalResults?: string;
    Response: string;
    Error?: string;
}

export interface User {
    fullName: string;
    email: string;
    password?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    token?: string;
}
