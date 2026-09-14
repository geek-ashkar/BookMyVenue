import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {

  // Read saved user immediately when React starts
  const [user, setUser] = useState<User | null>(() => {
    const savedUser =
      localStorage.getItem("user");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  // Read token immediately when React starts
  const [token, setToken] =
    useState<string | null>(() => {
      return localStorage.getItem("token");
    });

  // No waiting is required because localStorage
  // was already read during initialization
  const loading = false;

  function login(
    token: string,
    user: User
  ) {
    setToken(token);
    setUser(user);

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
  }

  function logout() {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}