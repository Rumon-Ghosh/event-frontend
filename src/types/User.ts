export interface TUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "user";
  isActive: boolean;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}