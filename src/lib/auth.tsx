"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type User = {
  name: string;
  email: string;
  photoUrl: string;
};

type Account = User & { password: string };

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signUp(params: { name: string; email: string; photoUrl: string; password: string }): Promise<void>;
  signInWithGoogle(): Promise<void>;
  signOut(): void;
  updateProfile(update: { name: string; photoUrl: string }): Promise<void>;
};

const STORAGE_SESSION = "skillsphere-session";
const STORAGE_ACCOUNTS = "skillsphere-accounts";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function loadAccounts(): Record<string, Account> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_ACCOUNTS) ?? "{}") as Record<string, Account>;
  } catch {
    return {};
  }
}

function saveAccounts(accounts: Record<string, Account>) {
  localStorage.setItem(STORAGE_ACCOUNTS, JSON.stringify(accounts));
}

function loadSession(): User | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(STORAGE_SESSION) ?? "null") as User | null;
  } catch {
    return null;
  }
}

function saveSession(user: User | null) {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_SESSION);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = loadSession();
    setUser(stored);
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    const accounts = loadAccounts();
    const normalized = email.toLowerCase();
    const account = accounts[normalized];

    if (!account || account.password !== password) {
      throw new Error("Invalid email or password");
    }

    const nextUser = { name: account.name, email: account.email, photoUrl: account.photoUrl };
    setUser(nextUser);
    saveSession(nextUser);
  };

  const signUp = async ({ name, email, photoUrl, password }: { name: string; email: string; photoUrl: string; password: string }) => {
    const accounts = loadAccounts();
    const normalized = email.toLowerCase();

    if (accounts[normalized]) {
      throw new Error("Email already registered");
    }

    const account: Account = {
      name,
      email: normalized,
      photoUrl: photoUrl || "/avatar-placeholder.png",
      password,
    };

    accounts[normalized] = account;
    saveAccounts(accounts);
  };

  const signInWithGoogle = async () => {
    const googleUser: User = {
      name: "Google Learner",
      email: "google.learner@example.com",
      photoUrl: "https://i.postimg.cc/ZY4HRbY4/google-user.png",
    };
    const accounts = loadAccounts();
    accounts[googleUser.email.toLowerCase()] = { ...googleUser, password: "" };
    saveAccounts(accounts);

    setUser(googleUser);
    saveSession(googleUser);
  };

  const signOut = () => {
    setUser(null);
    saveSession(null);
  };

  const updateProfile = async ({ name, photoUrl }: { name: string; photoUrl: string }) => {
    if (!user) throw new Error("Not signed in");

    const accounts = loadAccounts();
    const normalized = user.email.toLowerCase();
    const account = accounts[normalized];

    if (!account) {
      throw new Error("Account not found");
    }

    account.name = name;
    account.photoUrl = photoUrl;
    saveAccounts(accounts);

    const nextUser = { ...user, name, photoUrl };
    setUser(nextUser);
    saveSession(nextUser);
  };

  const value = useMemo(
    () => ({ user, isLoading, signIn, signUp, signInWithGoogle, signOut, updateProfile }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
