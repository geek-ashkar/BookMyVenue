import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: "customer" | "owner" | "root_admin";
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
 const [user, setUser] = useState<User | null>(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
});

const [token, setToken] = useState<string | null>(() => {
  return localStorage.getItem("token");
});

function login(user: User, token: string) {
  setUser(user);
  setToken(token);

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

function logout() {
  setUser(null);
  setToken(null);

  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}