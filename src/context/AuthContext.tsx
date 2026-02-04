import { createContext, useContext, useEffect, useState } from "react";
import type { IUser } from "../assets/assets";
import api from "../configs/api";
import { toast } from "sonner";

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  login: (user: { email: string; password: string }) => Promise<void>;

  signup: (user: {
    email: string;
    password: string;
    name: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const signup = async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      const { data } = await api.post("/api/auth/register", {
        email,
        password,
        name,
      });

      if (data.user) {
        setUser(data.user as IUser);
        setIsLoggedIn(true);
      }
      toast.success("User created successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await api.post("/api/auth/login", { email, password });

      if (data.user) {
        setUser(data.user as IUser);
        setIsLoggedIn(true);
      }
      toast.success("User logged in successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      const { data } = await api.post("/api/auth/logout");
      setUser(null);
      setIsLoggedIn(false);
      toast.success("Logued out successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/api/auth/verify");
      if (data.user) {
        setUser(data.user as IUser);
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUser();
    })();
  }, []);

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
