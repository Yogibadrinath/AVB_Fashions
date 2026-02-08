import React, { createContext, useContext, useState } from "react";
import { DecryptData, EncryptData } from "./cryptoUtils";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (enteredPassword: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        // On refresh, check the window name
        try {
            const data = window.name; 
            return DecryptData(data) === "is_authenticated";
        } catch {
            return false;
        }
    });

    const login = (enteredPassword: string) => {
        const encryptedStoredPw = import.meta.env.VITE_ENCRYPTED_ADMIN_PW || "";
        const decryptedPw = DecryptData(encryptedStoredPw);

        if (enteredPassword === decryptedPw) {
            // Store the flag in the window object itself
            window.name = EncryptData("is_authenticated");
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        window.name = ""; // Clear window name
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};