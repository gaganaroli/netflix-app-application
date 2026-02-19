import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    signup: (userData: User) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
    });

    useEffect(() => {
        const token = localStorage.getItem('netflix_token');
        const user = localStorage.getItem('netflix_user');
        if (token && user) {
            setState({
                user: JSON.parse(user),
                isAuthenticated: true,
            });
        }
    }, []);

    const signup = async (userData: User) => {
        // Mock signup: Store user in localStorage
        localStorage.setItem('registered_user', JSON.stringify(userData));
        return Promise.resolve();
    };

    const login = async (email: string, password: string) => {
        const registeredUserJson = localStorage.getItem('registered_user');
        if (!registeredUserJson) {
            throw new Error('User not found. Please sign up first.');
        }

        const registeredUser = JSON.parse(registeredUserJson);
        if (registeredUser.email === email && registeredUser.password === password) {
            const token = 'mock_jwt_token_' + Math.random().toString(36).substr(2);
            localStorage.setItem('netflix_token', token);
            localStorage.setItem('netflix_user', JSON.stringify(registeredUser));
            setState({
                user: registeredUser,
                isAuthenticated: true,
            });
        } else {
            throw new Error('Invalid email or password');
        }
    };

    const logout = () => {
        localStorage.removeItem('netflix_token');
        localStorage.removeItem('netflix_user');
        setState({
            user: null,
            isAuthenticated: false,
        });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
