"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: any) => Promise<any>;
  logout: () => Promise<void>;
  registerUser: (data: any) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const res = await axiosPublic.get("users/me");
      if (res.data.success) {
        setUser(res.data.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Critical error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (data: any) => {
    setLoading(true);
    try {
      const res = await axiosPublic.post("users/login", data);
      if (res.data.success) {
        setUser(res.data.data);
        return res.data;
      }
    } catch (error: any) {
      throw error.response?.data || error.message;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (data: any) => {
    setLoading(true);
    try {
      const res = await axiosPublic.post("users/register", data);
      if (res.data.success) {
        setUser(res.data.data);
        return res.data;
      }
    } catch (error: any) {
      throw error.response?.data || error.message;
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
    <AuthContext.Provider value={{ user, loading, login, logout, registerUser }}>
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
