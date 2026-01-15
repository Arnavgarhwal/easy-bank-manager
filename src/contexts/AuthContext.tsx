import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  isAdmin?: boolean;
  createdAt: string;
  isGoogleUser?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  loginWithGoogle: (googleUser: { email: string; name: string; avatar: string }) => { success: boolean; error?: string; isNewUser?: boolean };
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  signupWithGoogle: (googleUser: { email: string; name: string; avatar: string }) => { success: boolean; error?: string };
  logout: () => void;
  getRegisteredUsers: () => User[];
  getGoogleAccounts: () => { email: string; name: string; avatar: string }[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default registered users
const defaultUsers: User[] = [
  { id: "1", name: "Admin User", email: "admin123@gmail.com", password: "admin12345", isAdmin: true, createdAt: "2024-01-01", avatar: "AU" },
  { id: "2", name: "Demo User", email: "user@example.com", password: "user123", isAdmin: false, createdAt: "2024-01-01", avatar: "DU" },
  { id: "3", name: "Vault Demo", email: "demo@vault.com", password: "demo123", isAdmin: false, createdAt: "2024-01-01", avatar: "VD" },
];

// Simulated Google accounts on the device
const simulatedGoogleAccounts = [
  { email: "arnav.garhwal@gmail.com", name: "Arnav Garhwal", avatar: "AG" },
  { email: "personal.account@gmail.com", name: "Personal Account", avatar: "PA" },
  { email: "work.email@gmail.com", name: "Work Account", avatar: "WA" },
];

const USERS_STORAGE_KEY = "vault_registered_users";
const CURRENT_USER_KEY = "vault_current_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Initialize users in localStorage if not present
  useEffect(() => {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (!storedUsers) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
    }

    // Check for existing session
    const currentUser = localStorage.getItem(CURRENT_USER_KEY);
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const getRegisteredUsers = (): User[] => {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultUsers;
  };

  const getGoogleAccounts = () => {
    return simulatedGoogleAccounts;
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const users = getRegisteredUsers();
    const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!foundUser) {
      return { success: false, error: "Account Not Found" };
    }

    if (foundUser.password !== password) {
      return { success: false, error: "Incorrect Password" };
    }

    setUser(foundUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
    return { success: true };
  };

  const loginWithGoogle = (googleUser: { email: string; name: string; avatar: string }): { success: boolean; error?: string; isNewUser?: boolean } => {
    const users = getRegisteredUsers();
    const foundUser = users.find((u) => u.email.toLowerCase() === googleUser.email.toLowerCase());

    if (!foundUser) {
      return { success: false, error: "Account Not Found", isNewUser: true };
    }

    setUser(foundUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
    return { success: true };
  };

  const signup = (name: string, email: string, password: string): { success: boolean; error?: string } => {
    const users = getRegisteredUsers();
    const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
      return { success: false, error: "Email Already Registered" };
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      avatar: name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2),
      isAdmin: false,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return { success: true };
  };

  const signupWithGoogle = (googleUser: { email: string; name: string; avatar: string }): { success: boolean; error?: string } => {
    const users = getRegisteredUsers();
    const existingUser = users.find((u) => u.email.toLowerCase() === googleUser.email.toLowerCase());

    if (existingUser) {
      return { success: false, error: "Email Already Registered" };
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: googleUser.name,
      email: googleUser.email,
      password: "", // Google users don't have passwords
      avatar: googleUser.avatar,
      isAdmin: false,
      createdAt: new Date().toISOString(),
      isGoogleUser: true,
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        signup,
        signupWithGoogle,
        logout,
        getRegisteredUsers,
        getGoogleAccounts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
