"use client";

import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useRouter } from "next/navigation";
import { TUser } from "@/types/User";

const getMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred.";
};

interface AuthContextType {
  user: TUser | null;
  loading: boolean;
  login: (data: unknown) => Promise<unknown>;
  logout: () => Promise<void>;
  registerUser: (data: unknown) => Promise<unknown>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const axiosPublic = useAxiosPublic();
  const router = useRouter();

  const fetchUser = useCallback(async (showLoader = true) => {
    if (showLoader) {
      setLoading(true);
    }

    try {
      const res = await axiosPublic.get("users/me");

      if (res.data.success) {
        setUser(res.data.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      if (getMessage(error) === "Network Error") {
        console.warn("Backend server is unreachable. Please check if the server is running on port 5000.");
      } else {
        console.error("Critical error fetching user:", error);
      }
      if (showLoader) {
        setUser(null);
      }
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  }, [axiosPublic]);

  const refetchUser = async () => {
    await fetchUser(false);
  };

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  const login = async (data: unknown) => {
    setLoading(true);
    try {
      const res = await axiosPublic.post("users/login", data);

      if (res.data.success) {
        setUser(res.data.data);
        return res.data;
      }
      throw new Error("Login failed.");
    } catch (error) {
      throw new Error(getMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (data: unknown) => {
    setLoading(true);
    try {
      const res = await axiosPublic.post("users/register", data);

      if (res.data.success) {
        setUser(res.data.data);
        return res.data;
      }
      throw new Error("Registration failed.");
    } catch (error) {
      throw new Error(getMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axiosPublic.post("users/logout");
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, registerUser, refetchUser }}
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
