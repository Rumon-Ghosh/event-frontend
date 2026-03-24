export interface TEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;      
  capacity: number;
  image: string;
  createdBy: string;
  status: "pending" | "approved";
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}