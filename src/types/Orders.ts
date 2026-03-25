export interface TOrders {
  _id: string;
  event: {
    _id: string;
    title: string;
    description: string;
    price: number;
  };
  user: {
    _id: string;
    name: string;
    email: string;
  };
  quantity: number;
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}